import { inject, injectable } from 'inversify';
import * as express from 'express';

import AccountController from '../controllers/accountController';
import AuthToken from '../models/authToken';
import BaseRoute from './baseRoute';
import dependencyIdentifiers from '../dependencyIdentifiers';
import ModelBinder from '../services/modelBinder';
import User from '../models/user';

@injectable()
export default class AccountRoute extends BaseRoute {

  private accountController: AccountController;
  private modelBinder: ModelBinder;

  constructor(
    @inject(dependencyIdentifiers.AccountController) accountController: AccountController,
    @inject(dependencyIdentifiers.ModelBinder) modelBinder: ModelBinder) {
    super();
    this.accountController = accountController;
    this.modelBinder = modelBinder;
  }

  public configure(app: express.Application): void {

    app
      .route('/api/account/register')
      .post(async (request, response) => {
        return super.tryAction<User>(async () => {
          const user = this.modelBinder.getUser(request.body);
          return super.buildResponse(response,
            await this.accountController.registerAsync(user));
        });
      });

    app
      .route('/api/account/login')
      .post(async (request, response) => {
        return super.tryAction<AuthToken>(async () => {
          return super.buildResponse(response,
            await this.accountController.loginAsync(request.body.email, request.body.password));
        });
      });
  }
}
