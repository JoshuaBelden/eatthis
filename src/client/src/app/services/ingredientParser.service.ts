import { Ingredient } from '../models/ingredient';

export class IngredientParser {
    public parse(ingredients: string): Array<Ingredient> {
        return ingredients.split('\r\n').map(line => this.parseIngredient(line));
    }

    public toString(ingredients: Array<Ingredient>): string {
        return ingredients
            .map(ingredient => [
                ingredient.quantity || '',
                ingredient.unit || '',
                ingredient.name || '',
                ingredient.preparation || '',
                ingredient.purpose || '']
                .filter(item => item)
                .join(' '))
            .join('\r\n');
    }

    private parseIngredient(line: string): Ingredient {
        return {
            id: '',
            name: '',
            quantity: 0,
            unit: '',
            preparation: '',
            purpose: ''
        };
    }
}
