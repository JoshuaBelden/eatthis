import * as express from 'express';
import { inject, injectable } from 'inversify';
import * as Moment from 'moment';
import GroceryController from '../controllers/groceryController';
import dependencyIdentifiers from '../dependencyIdentifiers';
import AuthenticationService from '../services/authenticationService';
import IRoute from './iRoute';

@injectable()
export default class GroceryRoute implements IRoute {

  private groceryController: GroceryController;
  private authenticationService: AuthenticationService;

  constructor(
    @inject(dependencyIdentifiers.GroceryController) groceryController: GroceryController,
    @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticationService) {
    this.groceryController = groceryController;
    this.authenticationService = authenticationService;
  }

  public configure(app: express.Application): void {

    app
      .route('/grocery/:groceryId')
      .get(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const result = await this.groceryController.getAsync(authResult.value.id, request.params.groceryId);
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error);
      });

    app
      .route('/groceries/user')
      .get(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const result = await this.groceryController.getForUserAsync(authResult.value.id);
        return result.success
          ? response.status(200).send(result.value)
          : response.status(500).send(result.error);
      });

    app
      .route('/grocery')
      .post(async (request, response) => {

        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const startDate = Moment(request.body.startDate).toDate();
        const stopDate = Moment(request.body.stopDate).toDate();

        const result = await this.groceryController.createAsync(authResult.value.id, startDate, stopDate);
        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error);
      });

    app
      .route('/grocery/:id')
      .delete(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const result = await this.groceryController.deleteAsync(authResult.value.id, request.params.id);
        return result.success
          ? response.status(204).send(result.value)
          : response.status(500).send(result.error);
      });

    app
      .route('/grocery/:groceryId/')
      .post(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const result = await this.groceryController.createGroceryItemAsync(
          authResult.value.id,
           request.params.groceryId,
           request.body.line);

        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error);
      });

    app
      .route('/grocery/:groceryId/')
      .put(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const groceryItem = request.body;

        const result = await this.groceryController.updateGroceryItemAsync(authResult.value.id, request.params.groceryId, groceryItem);
        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error);
      });

    app
      .route('/grocery/:groceryId/:groceryItemId')
      .delete(async (request, response) => {
        const authResult = this.authenticationService.getAuthorizedUser(request);
        if (!authResult.success) {
          return response.status(401).send(authResult.error);
        }

        const result = await this.groceryController.deleteGroceryItemAsync(
          authResult.value.id,
          request.params.groceryId,
          request.params.groceryItemId);

        return result.success
          ? response.status(204).send(result.value)
          : response.status(500).send(result.error);
      });
  }
}
