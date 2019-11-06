import { inject, injectable } from 'inversify';
import * as express from 'express';

import BaseRoute from './baseRoute';
import dependencyIdentifiers from '../dependencyIdentifiers';
import CommonItemsController from '../controllers/commonItemsController';
import CommonItems from '../models/commonItems';

@injectable()
export default class CommonItemsRoute extends BaseRoute {

  private commonItemsController: CommonItemsController;

  constructor(
    @inject(dependencyIdentifiers.CommonItemsController) commonItemsController: CommonItemsController) {
    super();
    this.commonItemsController = commonItemsController;
  }

  public configure(app: express.Application): void {

    app
      .route('/api/commonitems')
      .get(async (request, response) => {
        return super.tryAction<CommonItems>(async () => {
          const user = super.getAuthenticatedUser(request);
          super.buildResponse(response,
            await this.commonItemsController.getForUserAsync(user.id));
        });
      });

    app
      .route('/api/commonItems')
      .post(async (request, response) => {
        return super.tryAction<CommonItems>(async () => {
          const user = super.getAuthenticatedUser(request);
          const items = request.body.items;
          return super.buildResponse(response,
            await this.commonItemsController.updateAsync(user.id, items));
        });
      });
  }
}
