import { injectable } from 'inversify'
import { Recipe } from '../models/recipe'

@injectable()
export default class ModelBinder {
  public getRecipe(userId: string, body: any): Recipe {
    return {
      id: body.id,
      userId: userId,
      title: body.title,
      description: body.description,
      ingredients: body.ingredients.map(i => {
        return {
          id: i.id,
          title: i.title
        }
      })
    }
  }
}