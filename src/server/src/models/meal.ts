import { Moment } from 'moment'

export default class Meal {
    public id: string
    public userId: string
    public recipeId: string
    public occurs: Moment
}