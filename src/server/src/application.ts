import * as bodyParser from 'body-parser'
import * as cors from "cors";
import * as express from 'express'
import { injectable, multiInject } from 'inversify'
import { serviceIdentity } from './dependency.config'
import IRoute from './routes/iRoute'

@injectable()
export default class Application {
  public listener: express.Application

  public constructor(@multiInject(serviceIdentity.Routes) routes: Array<IRoute>) {
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
