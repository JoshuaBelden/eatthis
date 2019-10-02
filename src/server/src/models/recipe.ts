import { Ingredient } from "./ingredient";

export interface Recipe {
    id: string,
    userId: string,
    title: string,
    description: string,
    ingredients: Array<Ingredient>
}