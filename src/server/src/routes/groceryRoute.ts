import { inject, injectable } from 'inversify';
import * as express from 'express';
import * as Moment from 'moment';

import BaseRoute from './baseRoute';
import dependencyIdentifiers from '../dependencyIdentifiers';
import GroceryController from '../controllers/groceryController';
import Grocery from '../models/grocery';
import GroceryItem from '../models/groceryItem';

@injectable()
export default class GroceryRoute extends BaseRoute {

  private groceryController: GroceryController;

  constructor(
    @inject(dependencyIdentifiers.GroceryController) groceryController: GroceryController) {
    super();
    this.groceryController = groceryController;
  }

  public configure(app: express.Application): void {

    app
      .route('/api/grocery/:groceryId')
      .get(async (request, response) => {
        return super.tryAction<Grocery>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.groceryController.getAsync(user.id, request.params.groceryId));
        });
      });

    app
      .route('/api/groceries/user')
      .get(async (request, response) => {
        return super.tryAction<Grocery[]>(async () => {
          const user = super.getAuthenticatedUser(request);
          super.buildResponse(response,
            await this.groceryController.getForUserAsync(user.id));
        });
      });

    app
      .route('/api/grocery')
      .post(async (request, response) => {
        return super.tryAction<Grocery>(async () => {
          const user = super.getAuthenticatedUser(request);
          const startDate = Moment(request.body.startDate).toDate();
          const stopDate = Moment(request.body.stopDate).toDate();
          return super.buildResponse(response,
            await this.groceryController.createAsync(user.id, startDate, stopDate));
        });
      });

    app
      .route('/api/grocery/:id')
      .delete(async (request, response) => {
        return super.tryAction<void>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.groceryController.deleteAsync(user.id, request.params.id));
        });
      });

    app
      .route('/api/grocery/:groceryId/')
      .post(async (request, response) => {
        return super.tryAction<GroceryItem>(async () => {
          const user = super.getAuthenticatedUser(request);
          return super.buildResponse(response,
            await this.groceryController.createGroceryItemAsync(user.id, request.params.groceryId, request.body.line));
        });
      });

    app
      .route('/api/grocery/:groceryId/')
      .put(async (request, response) => {
        return super.tryAction<GroceryItem>(async () => {
          const user = super.getAuthenticatedUser(request);
          super.buildResponse(response,
            await this.groceryController.updateGroceryItemAsync(user.id, request.params.groceryId, request.body));
        });
      });

    app
      .route('/api/grocery/:groceryId/:groceryItemId')
      .delete(async (request, response) => {
        return super.tryAction<void>(async () => {
          const user = super.getAuthenticatedUser(request);
          super.buildResponse(response,
            await this.groceryController.deleteGroceryItemAsync(user.id, request.params.groceryId, request.params.groceryItemId));
        });
      });
  }
}
