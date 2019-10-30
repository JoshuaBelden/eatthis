import { injectable } from 'inversify';
import { foodData } from '../data/foodData';

@injectable()
export default class DepartmentRepository {

    public getDepartment(input: string): string {
        for (const foodItem of foodData) {
            const match = this.match(`\\b(${foodItem.name})[s]*\\b`, input);
            if (!match) {
                continue;
            }

            return foodItem.department;
        }

        return 'unknown';
    }

    private match(expression: string, value: string) {
        const re = new RegExp(expression, 'i');
        return re.exec(value);
    }
}
