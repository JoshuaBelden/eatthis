import { Recipe } from '../models/recipe';

export default interface IRecipeRepository {
     getByUserId(userId: string): Promise<Array<Recipe>>
     create(recipe: Recipe): Promise<Recipe>
}