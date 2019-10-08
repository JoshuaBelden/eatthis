import { Ingredient } from '../models/ingredient';

export class IngredientParser {
    public parse(ingredients: string): Array<Ingredient> {
        return ingredients
            .split('\n')
            .map(line => line.replace('\r', ''))
            .map(line => this.parseLine(line));
    }

    public toString(ingredients: Array<Ingredient>): string {
        return ingredients
            .map(ingredient => [
                ingredient.line || '',
                // ingredient.unit || '',
                // ingredient.name || '',
                // ingredient.preparation || '',
                // ingredient.purpose || ''
            ]
            .filter(item => item)
            .join(' '))
            .join('\r\n');
    }

    private parseLine(line: string): Ingredient {
        return {
            line,
            quantity: 0,
            unit: '',
            ingredient: ''
        };
    }
}
