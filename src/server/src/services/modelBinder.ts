import { injectable } from 'inversify'
import { Recipe } from '../models/recipe'
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
      preparation: body.preparation,
      yield: body.yield,
      ingredients: body.ingredients.map(i => {
        return {
          id: i.id,
          name: i.name,
          unit: i.unit,
          quantity: i.quantity,
          preparation: i.preparation,
          purpose: i.purpose
        }
      })
    }
  }
}