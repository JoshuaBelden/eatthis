import Amount from './amount';

export default class GroceryItem {
    public id: string;
    public department: string;
    public ingredient: string;
    public amounts: Amount[];
    public onHandItem: boolean;
    public picked: boolean;
}
