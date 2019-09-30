import { Ingredient } from "./ingredient";

export interface Recipe {
    id: Number,
    title: String,
    description: String,
    ingredients: Array<Ingredient>
}