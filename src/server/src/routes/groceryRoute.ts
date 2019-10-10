import * as express from 'express'
import { inject, injectable } from 'inversify'
import GroceryController from '../controllers/groceryController'
import dependencyIdentifiers from '../dependencyIdentifiers'
import AuthenticationService from '../services/authenticationService'
import ModelBinder from '../services/modelBinder'
import IRoute from './iRoute'

@injectable()
export default class GroceryRoute implements IRoute {

  private groceryController: GroceryController
  private authenticationService: AuthenticationService
  private modelBinder: ModelBinder

  constructor(
    @inject(dependencyIdentifiers.GroceryController) groceryController: GroceryController,
    @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticationService,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    this.groceryController = groceryController
    this.authenticationService = authenticationService
    this.modelBinder = modelBinder
  }

  public configure(app: express.Application): void {

    app
      .route('/grocery/:groceryId')
      .get(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const result = await this.groceryController.getAsync(authResult.value.id, request.params['groceryId'])
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/groceries/user')
      .get(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const result = await this.groceryController.getForUserAsync(authResult.value.id)
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/grocery')
      .post(async (request, response) => {

        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const grocery = this.modelBinder.getGrocery(authResult.value.id, request.body)
        const result = await this.groceryController.createAsync(authResult.value.id, grocery)
        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/grocery')
      .put(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const grocery = this.modelBinder.getGrocery(authResult.value.id, request.body)
        const result = await this.groceryController.updateAsync(authResult.value.id, grocery)
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/grocery/:id')
      .delete(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request)
        if (!authResult.success) {
          return response.status(401).send(authResult.error)
        }

        const result = await this.groceryController.deleteAsync(authResult.value.id, request.params.id)
        return result.success
          ? response.status(204).send(result.value)
          : response.status(500).send(result.error)
      })
  }
}