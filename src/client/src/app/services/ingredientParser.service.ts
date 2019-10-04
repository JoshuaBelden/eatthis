import { Ingredient } from '../models/ingredient';
import { stringify } from 'querystring';
import { concat } from 'rxjs';

export class IngredientParser {
    public parse(ingredients: string): Array<Ingredient> {
        return [];
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
}
