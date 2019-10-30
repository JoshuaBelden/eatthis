import { inject, injectable } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import Grocery from '../models/grocery';
import GroceryItem from '../models/groceryItem';
import GroceryListBuilder from '../services/groceryListBuilder';
import GroceryRepository from '../repositories/groceryRepository';
import Ingredient from '../models/ingredient';
import Meal from '../models/meal';
import MealRepository from '../repositories/MealRepository';
import RecipeRepository from '../repositories/RecipeRepository';
import Result from '../models/result';

@injectable()
export default class GroceryController {

    private groceryRepository: GroceryRepository;
    private mealRepository: MealRepository;
    private recipeRepository: RecipeRepository;
    private groceryListBuilder: GroceryListBuilder;

    constructor(
        @inject(dependencyIdentifiers.GroceryRepository) groceryRepository: GroceryRepository,
        @inject(dependencyIdentifiers.MealRepository) mealRepository: MealRepository,
        @inject(dependencyIdentifiers.RecipeRepository) recipeRepository: RecipeRepository,
        @inject(dependencyIdentifiers.GroceryListbuilder) groceryListBuilder: GroceryListBuilder) {
        this.groceryRepository = groceryRepository;
        this.mealRepository = mealRepository;
        this.recipeRepository = recipeRepository;
        this.groceryListBuilder = groceryListBuilder;
    }

    public async getAsync(userId: string, groceryId: string): Promise<Result<Grocery>> {
        return new Result<Grocery>(true, await this.groceryRepository.getAsync(userId, groceryId));
    }

    public async getForUserAsync(userId: string): Promise<Result<Array<Grocery>>> {
        return new Result<Array<Grocery>>(true, await this.groceryRepository.getByUserIdAsync(userId));
    }

    public async createAsync(userId: string, startDate: Date, stopDate: Date): Promise<Result<Grocery>> {
        const meals = await this.mealRepository.getAsync(userId, startDate, stopDate);
        const groceryItems = await this.generateGroceryItems(userId, meals);
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

    public async createGroceryItemAsync(userId: string, groceryId: string, line: string): Promise<Result<GroceryItem>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        const groceryItem = {
            id: '',
            department: '',
            ingredient: line,
            quantity: 1,
            unit: '',
            picked: false
        };
        return new Result<GroceryItem>(true, await this.groceryRepository.createGroceryItemAsync(userId, grocery, groceryItem));
    }

    public async updateGroceryItemAsync(userId: string, groceryId: string, groceryItem: GroceryItem): Promise<Result<GroceryItem>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        return new Result<GroceryItem>(true, await this.groceryRepository.updateGroceryItemAsync(userId, grocery, groceryItem));
    }

    public async deleteGroceryItemAsync(userId: string, groceryId: string, groceryItemId: string): Promise<Result<void>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        return new Result<void>(true, await this.groceryRepository.deleteGroceryItemAsync(userId, grocery, groceryItemId));
    }

    private async generateGroceryItems(userId: string, meals: Array<Meal>): Promise<Array<GroceryItem>> {
        const ingredients: Array<Ingredient> = [];
        for (const meal of meals) {
            const recipe = await this.recipeRepository.getAsync(userId, meal.recipeId);
            for (const ingredient of recipe.ingredients) {
                ingredients.push(ingredient);
            }
        }

        return this.groceryListBuilder.combineIngredients(userId, ingredients);
    }
}
