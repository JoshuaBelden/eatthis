import { inject, injectable } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import DocumentRepository from '../repositories/documentRepository';
import IngredientParser from '../services/ingredientParser';
import MealRepository from '../repositories/mealRepository';
import Recipe from '../models/recipe';
import RecipeRepository from '../repositories/recipeRepository';
import Result from '../models/result';
import UnitsOfMeasureRepository from '../repositories/unitsOfMeasureRepository';
import Ingredient from '../models/ingredient';

@injectable()
export default class RecipeController {

    private documentRepository: DocumentRepository;
    private ingredientParser: IngredientParser;
    private mealRepository: MealRepository;
    private recipeRepository: RecipeRepository;
    private unitsOfMeasureRepository: UnitsOfMeasureRepository;

    constructor(
        @inject(dependencyIdentifiers.DocumentRepository) documentrepository: DocumentRepository,
        @inject(dependencyIdentifiers.IngredientParser) ingredientParser: IngredientParser,
        @inject(dependencyIdentifiers.MealRepository) mealRepository: MealRepository,
        @inject(dependencyIdentifiers.RecipeRepository) recipeRepository: RecipeRepository,
        @inject(dependencyIdentifiers.UnitsOfMeasureRepository) unitsOfMeasureRepository: UnitsOfMeasureRepository) {
        this.documentRepository = documentrepository;
        this.ingredientParser = ingredientParser;
        this.mealRepository = mealRepository;
        this.recipeRepository = recipeRepository;
        this.unitsOfMeasureRepository = unitsOfMeasureRepository;
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

        try {
            recipe.ingredients = await this.createIngredientsAsync(recipe);
            return new Result<Recipe>(true, await this.recipeRepository.createAsync(userId, recipe));
        } catch (error) {
            return new Result<Recipe>(false, error);
        }
    }

    public async updateAsync(userId: string, recipe: Recipe): Promise<Result<Recipe>> {
        recipe.ingredients = await this.createIngredientsAsync(recipe);
        return new Result<Recipe>(true, await this.recipeRepository.updateAsync(userId, recipe));
    }

    public async deleteAsync(userId: string, id: string): Promise<Result<void>> {
        await this.mealRepository.deleteForRecipeAsync(userId, id);
        return new Result<void>(true, await this.recipeRepository.deleteAsync(userId, id));
    }

    private async createIngredientsAsync(recipe: Recipe): Promise<Ingredient[]> {
        const unitsOfMeasure = await this.unitsOfMeasureRepository.getUnitsOfMeasure();
        const foodPreparations = await this.documentRepository.getAsync('food-preparations');
        const foodModifiers = await this.documentRepository.getAsync('food-modifiers');
        const foodData = await this.documentRepository.getAsync('food-data');
        return recipe.ingredients.map(ingredient =>
            this.ingredientParser.parse(
                ingredient.input, unitsOfMeasure, foodPreparations.content, foodModifiers.content, foodData.content));
    }
}
