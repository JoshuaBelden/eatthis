import { Container } from 'inversify'
import "reflect-metadata"
import Application from '../application'
import UserController from '../controllers/userController'
import IUserRepository from '../data/iUserRepository'
import UserRepository from '../data/userRepository'
import IRoute from '../routes/iRoute'
import UserRoute from '../routes/userRoute'
import SERVICE_IDENTIFIERS from './serviceIdentifiers'

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