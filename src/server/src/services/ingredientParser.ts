import Ingredient from '../models/ingredient';
import { injectable } from 'inversify';

import { foodData } from '../data/foodData';
import { foodModifiers } from '../data/foodModifiers';
import { foodPreparations } from '../data/foodPreparations';

@injectable()
export default class IngredientParser {
    private units: Map<string, Array<string>> = new Map([
        ['$1 can', ['([0-9]+.ounce).*can']],
        ['$1 slice', ['([0-9]+.ounce).*slice']],
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
        ['stick', ['(stick)[s]*']],
        ['clove', ['(clove)[s]*']],
        ['bottle', ['(bottle)[s]*']],
    ]);

    public parse(input: string): Ingredient {
        if (!input) {
            throw new Error('Ingredient line cannot be empty.');
        }

        const value = input.toLowerCase();

        const name = this.parseForFoodItemMatch(value);
        const quantity = this.parseQuantity(value);
        const unitOfMeasure = this.parseUnit(value);
        const modifier = this.parseForExpressionMatch(foodModifiers, value);
        const preparation = this.parseForExpressionMatch(foodPreparations, value);

        return {
            input,
            quantity,
            unitOfMeasure,
            name,
            modifier,
            preparation
        };
    }

    private parseForFoodItemMatch(input: string): string {
        for (const foodItem of foodData) {
            const match = this.match(`\\b(${foodItem.name})[s]*\\b`, input);
            if (!match) {
                continue;
            }

            return match[this.expressionIncludesCapture(foodItem.name) ? 2 : 1];
        }

        return null;
    }

    private parseForExpressionMatch(expressions: string[], input: string): string {
        for (const expression of expressions) {
            const match = this.match(`\\b(${expression})[s]*\\b`, input);
            if (!match) {
                continue;
            }

            return match[this.expressionIncludesCapture(expression) ? 2 : 1];
        }

        return null;
    }

    private expressionIncludesCapture(expression: string) {
        return expression.includes('(');
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
