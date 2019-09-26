import * as bodyParser from 'body-parser'
import * as express from 'express'
import { injectable, multiInject } from 'inversify'
import SERVICE_IDENTIFIERS from './dependency/serviceIdentifiers'
import IRoute from './routes/iRoute'

@injectable()
export default class Application {
  public listener: express.Application

  public constructor(@multiInject(SERVICE_IDENTIFIERS.Routes) routes: Array<IRoute>) {
    this.listener = express()
    this.listener.use(bodyParser.json())

    for (const route of routes) {
      route.configure(this.listener)
    }
  }

  public listen (port: String) {
    this.listener.listen(port)
  }
}
