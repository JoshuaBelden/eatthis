export default class FoodItem {
    public constructor(name: string = '') {
        this.name = name;
        this.department = 'unknown';
    }
    public name: string;
    public department: string;
    public onHandItem: boolean;
}
