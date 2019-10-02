import * as express from 'express'
import { inject, injectable } from 'inversify'
import AccountController from '../controllers/accountController'
import SERVICE_IDENTIFIERS from '../dependencies/serviceIdentifiers'
import IRoute from './iRoute'

@injectable()
export default class AccountRoute implements IRoute {

  private accountController: AccountController

  constructor(@inject(SERVICE_IDENTIFIERS.AccountController) accountController: AccountController) {
    this.accountController = accountController
  }

  public configure(app: express.Application): void {
    app.route('/account/register').post((req, res) => this.accountController.register(req, res))
    app.route('/account/login').post((req, res) => this.accountController.login(req, res))
  }
}