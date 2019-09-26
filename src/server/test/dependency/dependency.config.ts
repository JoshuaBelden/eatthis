import { Container } from 'inversify'
import "reflect-metadata"
import Application from '../../src/application'
import UserController from '../../src/controllers/userController'
import IUserRepository from '../../src/data/iUserRepository'
import SERVICE_IDENTIFIERS from '../../src/dependency/serviceIdentifiers'
import IRoute from '../../src/routes/iRoute'
import UserRoute from '../../src/routes/userRoute'
import UserRepository from '../data/userRepositoryMock'

const container = new Container()

container
    .bind<IUserRepository>(SERVICE_IDENTIFIERS.IUserRepository)
    .to(UserRepository)

container
    .bind<UserController>(SERVICE_IDENTIFIERS.UserController)
    .to(UserController)

container
    .bind<IRoute>(SERVICE_IDENTIFIERS.Routes)
    .to(UserRoute)

container
    .bind<Application>(SERVICE_IDENTIFIERS.Application)
    .to(Application)

export default container