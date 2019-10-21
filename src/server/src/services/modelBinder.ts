import { injectable } from 'inversify'
import Grocery from '../models/grocery'
import Meal from '../models/meal'
import Recipe from '../models/recipe'
import User from '../models/user'

@injectable()
export default class ModelBinder {

  public getUser(body: any): User {
    return {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    }
  }

  public getRecipe(userId: string, body: any): Recipe {
    return {
      id: body.id,
      userId: userId,
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      preparation: body.preparation,
      yield: body.yield,
      ingredients: body.ingredients.map(i => {
        return {
          id: i.id,
          line: i.line,
          quantity: i.quantity,
          unit: i.unit,
          ingredient: i.ingredient,
        }
      })
    }
  }

  public getMeal(userId: string, body: any): Meal {
    return {
      id: body.id,
      userId: userId,
      recipeId: body.recipeId,
      occurs: body.occurs,
    }
  }

  public getGrocery(userId: string, body: any): Grocery {
    return {
      id: body.id,
      userId: userId,
      startDate: body.startDate,
      stopDate: body.stopDate,
      items: body.items,
    }
  }
}