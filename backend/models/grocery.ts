import GroceryItem from './groceryItem';

export default class Grocery {
    public id: string;
    public userId: string;
    public startDate: Date;
    public stopDate: Date;
    public items: Array<GroceryItem>;
}
