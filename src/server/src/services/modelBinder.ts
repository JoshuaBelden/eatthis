import { injectable } from 'inversify';

import Grocery from '../models/grocery';
import IDocument from '../models/document';
import Meal from '../models/meal';
import Recipe from '../models/recipe';
import User from '../models/user';

@injectable()
export default class ModelBinder {

  public getUser(body: any): User {
    return {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    };
  }

  public getRecipe(userId: string, body: any): Recipe {
    return {
      id: body.id,
      userId,
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      preparation: body.preparation,
      yield: body.yield,
      ingredients: body.ingredients.map(i => {
        return {
          id: i.id,
          input: i.input,
          quantity: i.quantity,
          unitOfMeasure: i.unitOfMeasure,
          name: i.name,
          modifier: i.modifier,
          preparation: i.preparation
        };
      })
    };
  }

  public getRecipes(userId: string, body: any): Array<Recipe> {
    return body.map(item => this.getRecipe(userId, item));
  }

  public getMeal(userId: string, body: any): Meal {
    return {
      id: body.id,
      userId,
      recipeId: body.recipeId,
      occurs: body.occurs,
    };
  }

  public getGrocery(userId: string, body: any): Grocery {
    return {
      id: body.id,
      userId,
      startDate: body.startDate,
      stopDate: body.stopDate,
      items: body.items,
    };
  }

  public getDocument(body: any): IDocument {
    return {
      contentType: body.contentType,
      content: body.content
    };
  }
}
