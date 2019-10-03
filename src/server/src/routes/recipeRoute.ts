import * as express from 'express'
import { inject, injectable } from 'inversify'
import RecipeController from '../controllers/recipeController'
import dependencyIdentifiers from '../dependencyIdentifiers'
import AuthenticationService from '../services/authenticationService'
import ModelBinder from '../services/modelBinder'
import IRoute from './iRoute'

@injectable()
export default class RecipeRoute implements IRoute {

  private recipeController: RecipeController
  private authenticationService: AuthenticationService
  private modelBinder: ModelBinder

  constructor(
    @inject(dependencyIdentifiers.RecipeController) recipeController: RecipeController,
    @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticationService,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    this.recipeController = recipeController
    this.authenticationService = authenticationService
    this.modelBinder = modelBinder
  }

  public configure(app: express.Application): void {

    // GET USER'S RECIPES
    app
      .route('/recipe')
      .get(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const result = await this.recipeController.getAsync(authResult.value.id)
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error)
      })

    // CREATE RECIPE
    app
      .route('/recipe')
      .post(async (request, response) => {

        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const recipe = this.modelBinder.getRecipe(authResult.value.id, request.body)
        const result = await this.recipeController.createAsync(recipe)
        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error)
      })
  }
}