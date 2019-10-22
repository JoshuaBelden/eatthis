export class FoodItemLocation {
    public department: string;
    public foodItem: string;
}

export class DepartmentMap {
    public userId: string;
    public foodItemLocations: FoodItemLocation[];
}
