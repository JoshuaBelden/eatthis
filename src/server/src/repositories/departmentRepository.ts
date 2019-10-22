import { injectable } from 'inversify';
import { DepartmentMap, FoodItemLocation } from '../models/departmentMap';

@injectable()
export default class DepartmentRepository {
    private departmentMaps: DepartmentMap[] = [
        {
            userId: '',
            foodItemLocations: [{
                department: 'baking',
                foodItem: 'salt'
            },
            {
                department: 'baking',
                foodItem: 'pepper'
            },
            {
                department: 'baking',
                foodItem: 'flour'
            },
            {
                department: 'dairy',
                foodItem: 'butter'
            },
            {
                department: 'dairy',
                foodItem: 'milk'
            }]
        }
    ];

    public getDepartment(userId: string, foodItem: string): string {
        const maps = this.departmentMaps.filter(map => map.userId === '' || map.userId === userId);
        const locations = ([] as FoodItemLocation[]).concat(...maps.map(map => map.foodItemLocations));
        const location = locations.find(l => l.foodItem === foodItem);
        return location.department;
    }
}
