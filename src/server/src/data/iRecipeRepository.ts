import { Recipe } from '../models/recipe';

export default interface IRecipeRepository {
     getByUserIdAsync(userId: string): Promise<Array<Recipe>>
     createAsync(recipe: Recipe): Promise<Recipe>
}