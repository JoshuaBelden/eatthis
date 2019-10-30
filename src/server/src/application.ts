import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { injectable, multiInject, inject } from 'inversify';

import dependencyIdentifiers from './dependencyIdentifiers';
import IRoute from './routes/iRoute';
import AuthorizationMiddleware from './services/authorizationMiddleware';

@injectable()
export default class Application {
  public listener: express.Application;

  public constructor(
    @inject(dependencyIdentifiers.AuthorizationMiddleware) authorizationMiddleware: AuthorizationMiddleware,
    @multiInject(dependencyIdentifiers.Routes) routes: Array<IRoute>
  ) {
    this.listener = express();
    this.listener.use(bodyParser.json());
    this.listener.use(cors());
    this.listener.use(authorizationMiddleware.build());

    for (const route of routes) {
      route.configure(this.listener);
    }
  }

  public listen(port: string) {
    this.listener.listen(port);
  }
}
