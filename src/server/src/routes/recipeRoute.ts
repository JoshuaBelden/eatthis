import * as express from 'express'
import { inject, injectable } from 'inversify'
import RecipeController from '../controllers/recipeController'
import SERVICE_IDENTIFIERS from '../dependencies/serviceIdentifiers'
import AuthenticationService from '../services/authenticationService'
import ModelBinder from '../services/modelBinder'
import IRoute from './iRoute'

@injectable()
export default class RecipeRoute implements IRoute {

  private recipeController: RecipeController
  private authenticationService: AuthenticationService
  private modelBinder: ModelBinder

  constructor(
    @inject(SERVICE_IDENTIFIERS.RecipeController) recipeController: RecipeController,
    @inject(SERVICE_IDENTIFIERS.AuthenticationService) authenticationService: AuthenticationService,
    @inject(SERVICE_IDENTIFIERS.ModelBinder) modelBinder: ModelBinder) {
    this.recipeController = recipeController
    this.authenticationService = authenticationService
    this.modelBinder = modelBinder
  }

  public configure(app: express.Application): void {

    // CREATE RECIPE
    app
      .route('/recipe')
      .post(async (request, response) => {

        const user = this.authenticationService.getAuthorizedUser(request)
        if (!user) {
          return response.status(401).send()
        }

        const result = await this.recipeController.createAsync(
          this.modelBinder.getRecipe(user.id, request.body)
        )

        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error)
      })
  }
}