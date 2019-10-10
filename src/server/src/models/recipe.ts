import Ingredient from './ingredient';

export default class Recipe {
    public id: string
    public userId: string
    public title: string
    public description: string
    public imageUrl: string
    public preparation: string
    public yield: string
    public ingredients: Array<Ingredient>
}