import { inject, injectable } from 'inversify';

import CommonItemsRepository from '../repositories/commonItemsRepository';
import dependencyIdentifiers from '../dependencyIdentifiers';
import DocumentRepository from '../repositories/documentRepository';
import Grocery from '../models/grocery';
import GroceryItem from '../models/groceryItem';
import GroceryListBuilder from '../services/groceryListBuilder';
import GroceryRepository from '../repositories/groceryRepository';
import Ingredient from '../models/ingredient';
import IngredientParser from '../services/ingredientParser';
import Meal from '../models/meal';
import MealRepository from '../repositories/mealRepository';
import RecipeRepository from '../repositories/recipeRepository';
import Result from '../models/result';
import UnitsOfMeasureRepository from '../repositories/unitsOfMeasureRepository';

@injectable()
export default class GroceryController {

    private commonItemsRepository: CommonItemsRepository;
    private documentRepository: DocumentRepository;
    private groceryListBuilder: GroceryListBuilder;
    private groceryRepository: GroceryRepository;
    private ingredientParser: IngredientParser;
    private mealRepository: MealRepository;
    private recipeRepository: RecipeRepository;
    private unitsOfMeasureRepository: UnitsOfMeasureRepository;

    constructor(
        @inject(dependencyIdentifiers.CommonItemsRepository) commonItemsRepository: CommonItemsRepository,
        @inject(dependencyIdentifiers.DocumentRepository) documentrepository: DocumentRepository,
        @inject(dependencyIdentifiers.GroceryListbuilder) groceryListBuilder: GroceryListBuilder,
        @inject(dependencyIdentifiers.GroceryRepository) groceryRepository: GroceryRepository,
        @inject(dependencyIdentifiers.IngredientParser) ingredientParser: IngredientParser,
        @inject(dependencyIdentifiers.MealRepository) mealRepository: MealRepository,
        @inject(dependencyIdentifiers.RecipeRepository) recipeRepository: RecipeRepository,
        @inject(dependencyIdentifiers.UnitsOfMeasureRepository) unitsOfMeasureRepository: UnitsOfMeasureRepository) {
        this.commonItemsRepository = commonItemsRepository;
        this.documentRepository = documentrepository;
        this.groceryListBuilder = groceryListBuilder;
        this.groceryRepository = groceryRepository;
        this.ingredientParser = ingredientParser;
        this.mealRepository = mealRepository;
        this.recipeRepository = recipeRepository;
        this.unitsOfMeasureRepository = unitsOfMeasureRepository;
    }

    public async getAsync(userId: string, groceryId: string): Promise<Result<Grocery>> {
        return new Result<Grocery>(true, await this.groceryRepository.getAsync(userId, groceryId));
    }

    public async getForUserAsync(userId: string): Promise<Result<Array<Grocery>>> {
        return new Result<Array<Grocery>>(true, await this.groceryRepository.getByUserIdAsync(userId));
    }

    public async createAsync(userId: string, startDate: Date, stopDate: Date): Promise<Result<Grocery>> {
        const meals = await this.mealRepository.getAsync(userId, startDate, stopDate);
        const commonItemIngredients = await this.generateCommonItemIngredientssAsync(userId);

        const grocery = new Grocery();
        grocery.userId = userId;
        grocery.startDate = startDate;
        grocery.stopDate = stopDate;
        grocery.items = await this.generateGroceryItems(userId, meals, commonItemIngredients);

        return new Result<Grocery>(true, await this.groceryRepository.createAsync(userId, grocery));
    }

    public async deleteAsync(userId: string, id: string): Promise<Result<void>> {
        return new Result<void>(true, await this.groceryRepository.deleteAsync(userId, id));
    }

    public async createGroceryItemAsync(userId: string, groceryId: string, input: string): Promise<Result<Grocery>> {
        const grocery = await this.groceryRepository.getAsync(userId, groceryId);
        const foodData = await this.documentRepository.getAsync('food-data');
        const ingredient = await this.generateIngredientAsync(input, userId);
        const groceryItems = await this.groceryListBuilder.combineIngredients(userId, [ingredient], foodData.content);
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

        ingredients.push(...commonItems);

        const foodData = await this.documentRepository.getAsync('food-data');
        return this.groceryListBuilder.combineIngredients(userId, ingredients, foodData.content);
    }

    private async generateCommonItemIngredientssAsync(userId: string): Promise<Ingredient[]> {
        const commonItems = await this.commonItemsRepository.getByUserIdAsync(userId);
        if (!commonItems) {
            return [];
        }

        const unitsOfMeasure = await this.unitsOfMeasureRepository.getUnitsOfMeasure();
        const foodPreparations = await this.documentRepository.getAsync('food-preparations');
        const foodModifiers = await this.documentRepository.getAsync('food-modifiers');
        const foodData = await this.documentRepository.getAsync('food-data');
        return commonItems
            ? commonItems.items.map(item =>
                this.ingredientParser.parse(item, unitsOfMeasure, foodPreparations.content, foodModifiers.content, foodData.content))
            : [];
    }

    private async generateIngredientAsync(input: string, userId: string): Promise<Ingredient> {
        const unitsOfMeasure = await this.unitsOfMeasureRepository.getUnitsOfMeasure();
        const foodPreparations = await this.documentRepository.getAsync('food-preparations');
        const foodModifiers = await this.documentRepository.getAsync('food-modifiers');
        const foodData = await this.documentRepository.getAsync('food-data');
        return this.ingredientParser
            .parse(input, unitsOfMeasure, foodPreparations.content, foodModifiers.content, foodData.content);
    }
}
