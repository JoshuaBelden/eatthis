import Ingredient from '../models/ingredient';
import { injectable } from 'inversify';

@injectable()
export default class IngredientParser {
    private foodWords = ['tomato sauce', 'butter'];
    private units: Map<string, Array<string>> = new Map([
        ['$1 can', ['([0-9]+.ounce).*can']],
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
        ['stick', ['stick', 'sticks']],
    ]);

    public parse(input: string): Ingredient {
        if (!input) {
            throw new Error('Ingredient line cannot be empty.');
        }

        const food = this.parseFood(input);
        const quantity = this.parseQuantity(input);
        const unit = this.parseUnit(input);

        return {
            line: input,
            quantity,
            unit,
            ingredient: food
        };
    }

    private parseFood(input: string): string {
        for (const food of this.foodWords) {
            const match = this.match(`\\b(${food})\\b`, input);

            if (!match) {
                continue;
            }

            return food;
        }

        return null;
    }

    private parseQuantity(input: string): number {
        const quantityMatch = input.match(/[-]?[0-9]+[ ,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/i);
        if (!quantityMatch) {
            return 1;
        }

        return this.isFraction(quantityMatch[0])
            ? this.parseFraction(quantityMatch[0])
            : parseFloat(quantityMatch[0]);
    }

    private parseUnit(input: string): string {
        for (const set of this.units) {
            for (const value of set[1]) {
                const match = this.match(`(${value})`, input);
                if (!match) {
                    continue;
                }

                return set[0].includes('$1')
                    ? set[0].replace('$1', match[2])
                    : set[0];
            }
        }

        return null;
    }

    private isFraction(input: string): boolean {
        return input.includes('/');
    }

    private parseFraction(input: string): number {
        const wholeParts = input.split(' ');
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

    private match(expression: string, value: string) {
        const re = new RegExp(expression, 'i');
        return re.exec(value);
    }
}
