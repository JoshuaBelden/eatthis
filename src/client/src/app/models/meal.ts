import { Moment } from 'moment';

export class Meal {
    public id: string;
    public userId: string;
    public recipeId: string;
    public occurs: Moment;
}
