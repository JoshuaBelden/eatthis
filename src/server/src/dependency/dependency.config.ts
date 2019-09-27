import { Container } from 'inversify'
import "reflect-metadata"
import Application from '../application'
import AccountController from '../controllers/accountController'
import AccountRepository from '../data/accountRepository'
import IAccountRepository from '../data/IAccountRepository'
import AccountRoute from '../routes/accountRoute'
import IRoute from '../routes/iRoute'
import SERVICE_IDENTIFIERS from './serviceIdentifiers'

const container = new Container()

container
    .bind<IAccountRepository>(SERVICE_IDENTIFIERS.IAccountRepository)
    .to(AccountRepository)

container
    .bind<AccountController>(SERVICE_IDENTIFIERS.AccountController)
    .to(AccountController)

container
    .bind<IRoute>(SERVICE_IDENTIFIERS.Routes)
    .to(AccountRoute)

container
    .bind<Application>(SERVICE_IDENTIFIERS.Application)
    .to(Application)

export default container