import * as express from 'express'
import { inject, injectable } from 'inversify'

import MealController from '../controllers/mealController'
import dependencyIdentifiers from '../dependencyIdentifiers'
import AuthenticationService from '../services/authenticationService'
import ModelBinder from '../services/modelBinder'
import IRoute from './iRoute'

@injectable()
export default class MealRoute implements IRoute {

  private mealController: MealController
  private authenticationService: AuthenticationService
  private modelBinder: ModelBinder

  constructor(
    @inject(dependencyIdentifiers.MealController) mealController: MealController,
    @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticationService,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    this.mealController = mealController
    this.authenticationService = authenticationService
    this.modelBinder = modelBinder
  }

  public configure(app: express.Application): void {

    // GET MEALS
    app
      .route('/meals/:startDate/:stopDate')
      .get(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const startDate = new Date(request.params['startDate'])
        const stopDate = new Date(request.params['stopDate'])

        const result = await this.mealController.getAsync(authResult.value.id, startDate, stopDate)
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error)
      })

    // MEAL EDITS
    app
      .route('/meal')
      .post(async (request, response) => {

        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const meal = this.modelBinder.getMeal(authResult.value.id, request.body)
        const result = await this.mealController.createAsync(authResult.value.id, meal)
        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/meal')
      .put(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const meal = this.modelBinder.getMeal(authResult.value.id, request.body)
        const result = await this.mealController.updateAsync(authResult.value.id, meal)
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/meal/:id')
      .delete(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const result = await this.mealController.deleteAsync(authResult.value.id, request.params.id)
        return result.success
          ? response.status(204).send(result.value)
          : response.status(500).send(result.error)
      })
  }
}