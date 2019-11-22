import { Amount } from './amount';

export class GroceryItem {
    public id: string;
    public department: string;
    public ingredient: string;
    public amounts: Amount[];
    public modifier: string;
    public picked: boolean;
    public onHandItem: boolean;
}
