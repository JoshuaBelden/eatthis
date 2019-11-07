import { inject, injectable } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import Grocery from '../models/grocery';
import GroceryItem from '../models/groceryItem';
import GroceryListBuilder from '../services/groceryListBuilder';
import GroceryRepository from '../repositories/groceryRepository';
import Ingredient from '../models/ingredient';
import Meal from '../models/meal';
import MealRepository from '../repositories/mealRepository';
import RecipeRepository from '../repositories/recipeRepository';
import Result from '../models/result';
import IngredientParser from '../services/ingredientParser';
import CommonItemsRepository from '../repositories/commonItemsRepository';

@injectable()
export default class GroceryController {

    private commonItemsRepository: CommonItemsRepository;
    private groceryListBuilder: GroceryListBuilder;
    private groceryRepository: GroceryRepository;
    private ingredientParser: IngredientParser;
    private mealRepository: MealRepository;
    private recipeRepository: RecipeRepository;

    constructor(
        @inject(dependencyIdentifiers.CommonItemsRepository) commonItemsRepository: CommonItemsRepository,
        @inject(dependencyIdentifiers.GroceryListbuilder) groceryListBuilder: GroceryListBuilder,
        @inject(dependencyIdentifiers.GroceryRepository) groceryRepository: GroceryRepository,
        @inject(dependencyIdentifiers.IngredientParser) ingredientParser: IngredientParser,
        @inject(dependencyIdentifiers.MealRepository) mealRepository: MealRepository,
        @inject(dependencyIdentifiers.RecipeRepository) recipeRepository: RecipeRepository) {
        this.commonItemsRepository = commonItemsRepository;
        this.groceryListBuilder = groceryListBuilder;
        this.groceryRepository = groceryRepository;
        this.ingredientParser = ingredientParser;
        this.mealRepository = mealRepository;
        this.recipeRepository = recipeRepository;
    }

    public async getAsync(userId: string, groceryId: string): Promise<Result<Grocery>> {
        return new Result<Grocery>(true, await this.groceryRepository.getAsync(userId, groceryId));
    }

    public async getForUserAsync(userId: string): Promise<Result<Array<Grocery>>> {
        return new Result<Array<Grocery>>(true, await this.groceryRepository.getByUserIdAsync(userId));
    }

    public async createAsync(userId: string, startDate: Date, stopDate: Date): Promise<Result<Grocery>> {
        const meals = await this.mealRepository.getAsync(userId, startDate, stopDate);
        const commonItems = await this.commonItemsRepository.getByUserIdAsync(userId);
        const commonItemIngredients = commonItems.items.map(item => this.ingredientParser.parse(item));
        const groceryItems = await this.generateGroceryItems(userId, meals, commonItemIngredients);
        const grocery = new Grocery();
        grocery.userId = userId;
        grocery.startDate = startDate;
        grocery.stopDate = stopDate;
        grocery.items = groceryItems;

        return new Result<Grocery>(true, await this.groceryRepository.createAsync(userId, grocery));
    }

    public async deleteAsync(userId: string, id: string): Promise<Result<void>> {
        return new Result<void>(true, await this.groceryRepository.deleteAsync(userId, id));
    }

    public async createGroceryItemAsync(userId: string, groceryId: string, input: string): Promise<Result<Grocery>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        const ingredient = this.ingredientParser.parse(input);
        const groceryItems = await this.groceryListBuilder.combineIngredients(userId, [ingredient]);
        grocery.items.push(...groceryItems);
        grocery.items = this.groceryListBuilder.combineGroceryItems(grocery.items);

        const update = await this.groceryRepository.updateAsync(userId, grocery);

        return new Result<Grocery>(true, update);
    }

    public async updateGroceryItemAsync(userId: string, groceryId: string, groceryItem: GroceryItem): Promise<Result<Grocery>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        grocery.items = grocery.items.filter(gi => gi.id !== groceryItem.id);
        grocery.items.push(groceryItem);
        return new Result(true, await this.groceryRepository.updateAsync(userId, grocery));
    }

    public async deleteGroceryItemAsync(userId: string, groceryId: string, groceryItemId: string): Promise<Result<Grocery>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        grocery.items = grocery.items.filter(groceryItem => groceryItem.id !== groceryItemId);
        return new Result(true, await this.groceryRepository.updateAsync(userId, grocery));
    }

    private async generateGroceryItems(userId: string, meals: Array<Meal>, commonItems: Ingredient[]): Promise<Array<GroceryItem>> {
        const ingredients: Ingredient[] = [];
        for (const meal of meals) {
            const recipe = await this.recipeRepository.getAsync(userId, meal.recipeId);
            for (const ingredient of recipe.ingredients) {
                ingredients.push(ingredient);
            }
        }

        ingredients.push(... commonItems);

        return this.groceryListBuilder.combineIngredients(userId, ingredients);
    }
}
