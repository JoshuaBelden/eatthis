import { inject, injectable } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import IngredientParser from '../services/ingredientParser';
import MealRepository from '../repositories/MealRepository';
import Recipe from '../models/recipe';
import RecipeRepository from '../repositories/RecipeRepository';
import Result from '../models/result';

@injectable()
export default class RecipeController {

    private recipeRepository: RecipeRepository;
    private mealRepository: MealRepository;
    private ingredientParser: IngredientParser;

    constructor(
        @inject(dependencyIdentifiers.RecipeRepository) recipeRepository: RecipeRepository,
        @inject(dependencyIdentifiers.MealRepository) mealRepository: MealRepository,
        @inject(dependencyIdentifiers.IngredientParser) ingredientParser: IngredientParser) {
        this.recipeRepository = recipeRepository;
        this.mealRepository = mealRepository;
        this.ingredientParser = ingredientParser;
    }

    public async getAsync(userId: string, recipeId: string): Promise<Result<Recipe>> {
        return new Result<Recipe>(true, await this.recipeRepository.getAsync(userId, recipeId));
    }

    public async getForUserAsync(userId: string): Promise<Result<Array<Recipe>>> {
        return new Result<Array<Recipe>>(true, await this.recipeRepository.getByUserIdAsync(userId));
    }

    public async createAsync(userId: string, recipe: Recipe): Promise<Result<Recipe>> {
        if (recipe.title.length === 0) {
            return new Result<Recipe>(false, null, 'Recipe title is required.');
        }

        recipe.ingredients = recipe.ingredients.map(ingredient => this.ingredientParser.parse(ingredient.input));
        return new Result<Recipe>(true, await this.recipeRepository.createAsync(userId, recipe));
    }

    public async updateAsync(userId: string, recipe: Recipe): Promise<Result<Recipe>> {
        recipe.ingredients = recipe.ingredients.map(ingredient => this.ingredientParser.parse(ingredient.input));
        return new Result<Recipe>(true, await this.recipeRepository.updateAsync(userId, recipe));
    }

    public async deleteAsync(userId: string, id: string): Promise<Result<void>> {
        await this.mealRepository.deleteForRecipeAsync(userId, id);
        return new Result<void>(true, await this.recipeRepository.deleteAsync(userId, id));
    }
}
