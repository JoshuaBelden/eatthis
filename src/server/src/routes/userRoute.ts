import * as express from 'express'
import { inject, injectable } from 'inversify'
import UserController from '../controllers/userController'
import SERVICE_IDENTIFIERS from '../dependency/serviceIdentifiers'
import IRoute from '../routes/iRoute'

@injectable()
export default class UserRoute implements IRoute {

  private userController: UserController

  constructor(@inject(SERVICE_IDENTIFIERS.UserController) userController: UserController) {
    this.userController = userController
  }

  public configure(app: express.Application): void {
    app.route('/users').post((req, res) => this.userController.insert(req, res))
    app.route('/users/:username').patch((req, res) => this.userController.update(req, res))
    app.route('/users/:username').delete((req, res) => this.userController.delete(req, res))
    app.route('/users/:username').get((req, res) => this.userController.get(req, res))
  }
}