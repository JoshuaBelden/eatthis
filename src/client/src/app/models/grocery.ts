import { GroceryItem } from './groceryItem';

export class Grocery {
    public id: string;
    public userId: string;
    public startDate: Date;
    public stopDate: Date;
    public items: Array<GroceryItem>;
}
