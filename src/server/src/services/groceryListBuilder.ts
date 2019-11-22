import { injectable, inject } from 'inversify';

import DepartmentRepository from '../repositories/departmentRepository';
import dependencyIdentifiers from '../dependencyIdentifiers';
import FoodItem from '../models/foodItem';
import GroceryItem from '../models/groceryItem';
import Ingredient from '../models/ingredient';
import Amount from '../models/amount';
import Grocery from '../models/grocery';

@injectable()
export default class GroceryListBuilder {

    private departmentRepository: DepartmentRepository;

    public constructor(
        @inject(dependencyIdentifiers.DepartmentRepository) departmentRepository: DepartmentRepository
    ) {
        this.departmentRepository = departmentRepository;
    }

    public async combineIngredients(userId: string, ingredients: Ingredient[], foodData: FoodItem[]): Promise<GroceryItem[]> {
        const groceryItems: GroceryItem[] = [];

        for (const ingredient of ingredients) {
            let groceryItem = groceryItems.find(item => item.ingredient === ingredient.name);
            if (!groceryItem) {
                const foodItem = this.departmentRepository.matchFoodItem(ingredient.name, foodData);
                groceryItem = {
                    id: '',
                    department: foodItem.department,
                    ingredient: ingredient.name,
                    amounts: [],
                    onHandItem: foodItem.onHandItem,
                    picked: false,
                };
                groceryItems.push(groceryItem);
            }
            const amount = {
                unit: ingredient.unitOfMeasure,
                quantity: ingredient.quantity
            };
            this.combineAmounts(groceryItem.amounts, [amount]);
        }

        return groceryItems;
    }

    public combineGroceryItems(groceryItems: GroceryItem[]): GroceryItem[] {
        const newCollection: GroceryItem[] = [];
        for (const newItem of groceryItems) {
            let existingItem = newCollection.find(i => i.ingredient = newItem.ingredient);
            if (!existingItem) {
                existingItem = newItem;
                newCollection.push(newItem);
            } else {
                this.combineAmounts(existingItem.amounts, newItem.amounts);
            }
        }
        return newCollection;
    }

    public combineAmounts(source: Amount[], items: Amount[]): void {
        for (const item of items) {
            let amount = source.find(i => i.unit === item.unit);
            if (!amount) {
                amount = new Amount();
                amount.quantity = 0;
                amount.unit = item.unit;
                source.push(amount);
            }
            amount.quantity += item.quantity;
            amount.quantity = parseFloat(amount.quantity.toFixed(2)); // Fix up the number of decimal places.
        }
    }
}
