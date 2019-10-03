import * as bodyParser from 'body-parser'
import * as cors from "cors";
import * as express from 'express'
import { injectable, multiInject } from 'inversify'
import dependencyIdentifiers from './dependencyIdentifiers'
import IRoute from './routes/iRoute'

@injectable()
export default class Application {
  public listener: express.Application

  public constructor(@multiInject(dependencyIdentifiers.Routes) routes: Array<IRoute>) {
    this.listener = express()
    this.listener.use(bodyParser.json())
    this.listener.use(cors())

    for (const route of routes) {
      route.configure(this.listener)
    }
  }

  public listen (port: String) {
    this.listener.listen(port)
  }
}
