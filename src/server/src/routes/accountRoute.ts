import * as express from 'express'
import { inject, injectable } from 'inversify'
import AccountController from '../controllers/accountController'
import { serviceIdentity } from '../dependency.config'
import ModelBinder from '../services/modelBinder'
import IRoute from './iRoute'

@injectable()
export default class AccountRoute implements IRoute {

  private accountController: AccountController
  private modelBinder: ModelBinder

  constructor(
    @inject(serviceIdentity.AccountController) accountController: AccountController,
    @inject(serviceIdentity.ModelBinder) modelBinder: ModelBinder) {
    this.accountController = accountController
    this.modelBinder = modelBinder
  }

  public configure(app: express.Application): void {

    app
      .route('/account/register')
      .post(async (request, response) => {
        const user = this.modelBinder.getUser(request.body)
        const result = await this.accountController.registerAsync(user)

        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error)
      })

    app
      .route('/account/login')
      .post(async (request, response) => {
        const result = await this.accountController.loginAsync(request.body.email, request.body.password)

        return result.success
          ? response.status(201).send(result.value)
          : response.status(500).send(result.error)
      })
  }
}