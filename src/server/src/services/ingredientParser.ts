import Ingredient from '../models/ingredient';
import { injectable } from 'inversify';
import { invalid } from 'moment';

@injectable()
export default class IngredientParser {
    private trashChars = [',', '(', ')', '[', ']', '-', '/'];
    private trashWords = ['a', 'and', 'to', 'less', 'taste', 'for', 'or', 'of', 'fresh', 'plus', 'with', 'more', 'freshly',
        'ground', 'heated', 'toasted', 'minced', 'chopped', 'finely', 'grated', 'divided', 'pressed',
        'chilled', 'shredded', 'topping', 'serving', 'thinly', 'sliced', 'peeled', 'diced', 'cored',
        'julienned', 'crumbled', 'drained', 'rinsed'];
    private cookingUnits: Map<string, Array<string>> = new Map([
        ['tsp', ['teaspoons', 'teaspoon', 'tsp']],
        ['tbs', ['tablespoons', 'tablespoon', 'tbs']],
        ['cup', ['cups', 'cup']],
        ['oz', ['ounces', 'ounce', 'oz']],
        ['pint', ['pints', 'pint']],
        ['qt', ['quarts', 'quart', 'qt']],
        ['gallon', ['gallons', 'gallon']],
        ['lb', ['pounds', 'pound', 'lb']],
        ['handful', ['handful']],
        ['dash', ['dash']],
        ['pinch', ['pinch']],
    ]);

    public parse(line: string): Ingredient {
        if (!line) {
            throw new Error('Ingredient line cannot be empty.');
        }

        let ingredient = line.trim().toLowerCase();
        ingredient = this.scrubTrashWords(ingredient);
        ingredient = this.scrubTrashChars(ingredient);

        const [quantity, quantityMatchString] = this.parseQuantity(ingredient);
        ingredient = ingredient.replace(quantityMatchString, '').trim();

        const [unit, unitMatchString] = this.parseUnit(ingredient);
        ingredient = ingredient.replace(unitMatchString, '').trim();

        return {
            line,
            quantity,
            unit,
            ingredient
        };
    }

    private match(expression: string, value: string) {
        const re = new RegExp(expression, 'i');
        return re.exec(value);
    }

    private scrubTrashChars(value: string): string {
        for (const char of this.trashChars) {
            value = value.replace(char, '').trim();
        }

        return value;
    }

    private scrubTrashWords(value: string): string {
        for (const word of this.trashWords) {
            const re = new RegExp(`(\\b${word}\\b)`, 'i');
            value = value.replace(re, '').trim();
        }

        return value;
    }

    private isFraction(value: string): boolean {
        return value.includes('/');
    }

    private parseFraction(value: string): number {
        const wholeParts = value.split(' ');
        let wholeResult = 0;
        let fractionString = '';
        if (wholeParts.length > 1) {
            wholeResult = parseInt(wholeParts[0], 10);
            fractionString = wholeParts[1];
        } else {
            fractionString = wholeParts[0];
        }

        const fractionParts = fractionString.split('/');
        const numerator = parseInt(fractionParts[0], 10);
        const denominator = parseInt(fractionParts[1], 10);
        const fractionResult = (numerator / denominator);

        return parseFloat((wholeResult + fractionResult).toFixed(2));
    }

    private parseQuantity(ingredient: string): [number, string] {
        let quantity = 1;
        let matchString = '';
        const quantityMatch = ingredient.match(/[-]?[0-9]+[ ,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/i);
        if (quantityMatch) {
            if (this.isFraction(quantityMatch[0])) {
                quantity = this.parseFraction(quantityMatch[0]);
            } else {
                quantity = parseFloat(quantityMatch[0]);
            }
            matchString = quantityMatch[0];
        }

        return [quantity, matchString];
    }

    private parseUnit(ingredient: string): [string, string] {
        let unit = '';
        let unitReplacedValue = '';
        for (const set of this.cookingUnits) {
            for (const value of set[1]) {
                const match = this.match(`(\\b${value}\\b)`, ingredient);
                if (!match) {
                    continue;
                }
                unit = set[0];
                unitReplacedValue = match[1];
                break;
            }
        }

        return [unit, unitReplacedValue];
    }
}
