import { inject, injectable } from 'inversify';
import GroceryRepository from '../repositories/groceryRepository';
import MealRepository from '../repositories/MealRepository';
import RecipeRepository from '../repositories/RecipeRepository';
import dependencyIdentifiers from '../dependencyIdentifiers';
import Grocery from '../models/grocery';
import { GroceryItem } from '../models/groceryItem';
import Result from '../models/result';

@injectable()
export default class GroceryController {

    private groceryRepository: GroceryRepository;
    private mealRepository: MealRepository;
    private recipeRepository: RecipeRepository;

    constructor(
        @inject(dependencyIdentifiers.GroceryRepository) groceryRepository: GroceryRepository,
        @inject(dependencyIdentifiers.MealRepository) mealRepository: MealRepository,
        @inject(dependencyIdentifiers.RecipeRepository) recipeRepository: RecipeRepository) {
        this.groceryRepository = groceryRepository;
        this.mealRepository = mealRepository;
        this.recipeRepository = recipeRepository;
    }

    public async getAsync(userId: string, groceryId: string): Promise<Result<Grocery>> {
        try {
            return new Result<Grocery>(true, await this.groceryRepository.getAsync(userId, groceryId));
        } catch (error) {
            return new Result<Grocery>(false, null, error);
        }
    }

    public async getForUserAsync(userId: string): Promise<Result<Array<Grocery>>> {
        try {
            return new Result<Array<Grocery>>(true, await this.groceryRepository.getByUserIdAsync(userId));
        } catch (error) {
            return new Result<Array<Grocery>>(false, null, error);
        }
    }

    public async createAsync(userId: string, startDate: Date, stopDate: Date): Promise<Result<Grocery>> {
        try {
            const groceryItems: Array<GroceryItem> = [];
            const meals = await this.mealRepository.getAsync(userId, startDate, stopDate);
            for (const meal of meals) {
                const recipe = await this.recipeRepository.getAsync(userId, meal.recipeId);
                for (const ingredient of recipe.ingredients) {
                    groceryItems.push({
                        id: '',
                        department: '',
                        ingredient: ingredient.line,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                        picked: false
                    });
                }
            }

            const grocery = new Grocery();
            grocery.userId = userId;
            grocery.startDate = startDate;
            grocery.stopDate = stopDate;
            grocery.items = groceryItems;

            return new Result<Grocery>(true, await this.groceryRepository.createAsync(userId, grocery));
        } catch (error) {
            return new Result<Grocery>(false, null, error);
        }
    }

    public async deleteAsync(userId: string, id: string): Promise<Result<void>> {
        try {
            return new Result<void>(true, await this.groceryRepository.deleteAsync(userId, id));
        } catch (error) {
            return new Result<void>(false, null, error);
        }
    }

    public async createGroceryItemAsync(userId: string, groceryId: string, line: string): Promise<Result<GroceryItem>> {
        try {
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
        } catch (error) {
            return new Result<GroceryItem>(false, null, error);
        }
    }

    public async updateGroceryItemAsync(userId: string, groceryId: string, groceryItem: GroceryItem): Promise<Result<GroceryItem>> {
        try {
            const grocery = await this.groceryRepository.getAsync(userId, groceryId);
            return new Result<GroceryItem>(true, await this.groceryRepository.updateGroceryItemAsync(userId, grocery, groceryItem));
        } catch (error) {
            return new Result<GroceryItem>(false, null, error);
        }
    }

    public async deleteGroceryItemAsync(userId: string, groceryId: string, groceryItemId: string): Promise<Result<void>> {
        try {
            const grocery = await this.groceryRepository.getAsync(userId, groceryId);
            return new Result<void>(true, await this.groceryRepository.deleteGroceryItemAsync(userId, grocery, groceryItemId));
        } catch (error) {
            return new Result<void>(false, null, error);
        }
    }
}
