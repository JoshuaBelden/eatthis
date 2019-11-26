import { inject, injectable } from 'inversify';
import * as express from 'express';

import BaseRoute from './baseRoute';
import dependencyIdentifiers from '../dependencyIdentifiers';
import ModelBinder from '../services/modelBinder';
import RecipeController from '../controllers/recipeController';
import Recipe from '../models/recipe';

@injectable()
export default class RecipeRoute extends BaseRoute {

  private recipeController: RecipeController;
  private modelBinder: ModelBinder;

  constructor(
    @inject(dependencyIdentifiers.RecipeController) recipeController: RecipeController,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    super();
    this.recipeController = recipeController;
    this.modelBinder = modelBinder;
  }

  public configure(app: express.Application): void {

    app
      .route('/api/recipe/:recipeId')
      .get(async (request, response) => {
        return super.tryAction<Recipe>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.recipeController.getAsync(user.id, request.params.recipeId));
        });
      });

    app
      .route('/api/recipes/user')
      .get(async (request, response) => {
        return super.tryAction<Recipe[]>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.recipeController.getForUserAsync(user.id));
        });
      });

    app
      .route('/api/recipe')
      .post(async (request, response) => {
        return super.tryAction<Recipe>(async () => {
          const user = super.getAuthenticatedUser(request);
          const recipe = this.modelBinder.getRecipe(user.id, request.body);
          return super.buildResponse(response,
            await this.recipeController.createAsync(user.id, recipe));
        });
      });

    app
      .route('/api/recipes')
      .post(async (request, response) => {
        return super.tryAction<Recipe>(async () => {
          const user = super.getAuthenticatedUser(request);
          const result = [];
          const recipes = this.modelBinder.getRecipes(user.id, request.body);

          for (const recipe of recipes) {
            result.push(await this.recipeController.updateAsync(user.id, recipe));
          }

          return result.every(r => r.success)
            ? response.status(201).send(result)
            : response.status(500).send(result);
        });
      });

    app
      .route('/api/recipe')
      .put(async (request, response) => {
        return super.tryAction<Recipe>(async () => {
          const user = super.getAuthenticatedUser(request);
          const recipe = this.modelBinder.getRecipe(user.id, request.body);
          return super.buildResponse(response,
            await this.recipeController.updateAsync(user.id, recipe));
        });
      });

    app
      .route('/api/recipe/:id')
      .delete(async (request, response) => {
        return super.tryAction<void>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.recipeController.deleteAsync(user.id, request.params.id));
        });
      });
  }
}
