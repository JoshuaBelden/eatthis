import { Moment } from 'moment'
import GroceryItem from './groceryItem'

export default class Grocery {
    public id: string
    public userId: string
    public startDate: Moment
    public stopDate: Moment
    public groceryItems: Array<GroceryItem>
}