import { injectable } from 'inversify';

import FoodItem from '../models/foodItem';

@injectable()
export default class DepartmentRepository {

    public matchFoodItem(input: string, foodData: FoodItem[]): FoodItem {
        for (const foodItem of foodData) {
            const match = this.match(`\\b(${foodItem.name})[s]*\\b`, input);
            if (!match) {
                continue;
            }

            return foodItem;
        }

        return new FoodItem();
    }

    private match(expression: string, value: string) {
        const re = new RegExp(expression, 'i');
        return re.exec(value);
    }
}
