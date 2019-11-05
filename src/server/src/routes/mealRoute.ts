import { inject, injectable } from 'inversify';
import * as express from 'express';
import * as Moment from 'moment';

import BaseRoute from './baseRoute';
import dependencyIdentifiers from '../dependencyIdentifiers';
import MealController from '../controllers/mealController';
import ModelBinder from '../services/modelBinder';
import Meal from '../models/meal';

@injectable()
export default class MealRoute extends BaseRoute {

  private mealController: MealController;
  private modelBinder: ModelBinder;

  constructor(
    @inject(dependencyIdentifiers.MealController) mealController: MealController,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    super();
    this.mealController = mealController;
    this.modelBinder = modelBinder;
  }

  public configure(app: express.Application): void {

    app
      .route('/api/meals/:startDate/:stopDate')
      .get(async (request, response) => {
        return super.tryAction<Meal[]>(async () => {
          const user = super.getAuthenticatedUser(request);
          const startDate = Moment(request.params.startDate).toDate();
          const stopDate = Moment(request.params.stopDate).toDate();
          super.buildResponse(response,
            await this.mealController.getAsync(user.id, startDate, stopDate));
        });
      });

    app
      .route('/api/meal')
      .post(async (request, response) => {
        return super.tryAction<Meal>(async () => {
          const user = super.getAuthenticatedUser(request);
          const meal = this.modelBinder.getMeal(user.id, request.body);
          super.buildResponse(response,
            await this.mealController.createAsync(user.id, meal));
        });
      });

    app
      .route('/api/meal/:id')
      .delete(async (request, response) => {
        return super.tryAction<void>(async () => {
          const user = super.getAuthenticatedUser(request);
          super.buildResponse(response,
            await this.mealController.deleteAsync(user.id, request.params.id));
        });
      });
  }
}
