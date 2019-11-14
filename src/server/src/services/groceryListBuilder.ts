import { injectable, inject } from 'inversify';

import DepartmentRepository from '../repositories/departmentRepository';
import dependencyIdentifiers from '../dependencyIdentifiers';
import FoodItem from '../models/foodItem';
import GroceryItem from '../models/groceryItem';
import Ingredient from '../models/ingredient';

@injectable()
export default class GroceryListBuilder {

    private departmentRepository: DepartmentRepository;

    public constructor(
        @inject(dependencyIdentifiers.DepartmentRepository) departmentRepository: DepartmentRepository
    ) {
        this.departmentRepository = departmentRepository;
    }

    public async combineIngredients(userId: string, ingredients: Ingredient[], foodData: FoodItem[]) {
        const groceryItems: Map<string, GroceryItem> = new Map<string, GroceryItem>();

        for (const ingredient of ingredients) {
            if (!groceryItems.has(ingredient.name)) {
                const foodItem = this.departmentRepository.matchFoodItem(ingredient.name, foodData);
                groceryItems.set(ingredient.name, {
                    id: '',
                    department: foodItem.department,
                    ingredient: ingredient.name,
                    unit: ingredient.unitOfMeasure,
                    quantity: ingredient.quantity,
                    onHandItem: foodItem.onHandItem,
                    picked: false,
                });
            } else {
                const item = groceryItems.get(ingredient.name);
                item.quantity += ingredient.quantity;
                item.quantity = parseFloat(item.quantity.toFixed(2));
            }
        }

        return Array.from(groceryItems.values());
    }

    public combineGroceryItems(groceryItems: GroceryItem[]) {
        const retVal: Map<string, GroceryItem> = new Map<string, GroceryItem>();
        for (const groceryItem of groceryItems) {
            if (!retVal.has(groceryItem.ingredient)) {
                retVal.set(groceryItem.ingredient, groceryItem);
            } else {
                const item = retVal.get(groceryItem.ingredient);
                item.quantity += groceryItem.quantity;
                item.quantity = parseFloat(item.quantity.toFixed(2));
            }
        }
        return Array.from(retVal.values());
    }
}
