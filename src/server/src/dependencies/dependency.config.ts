import { Container } from 'inversify'
import "reflect-metadata"
import Application from '../application'
import AccountController from '../controllers/accountController'
import RecipeController from '../controllers/recipeController'
import AccountRepository from '../data/accountRepository'
import IAccountRepository from '../data/IAccountRepository'
import IRecipeRepository from '../data/iRecipeRepository'
import RecipeRepository from '../data/recipeRepository'
import AccountRoute from '../routes/accountRoute'
import IRoute from '../routes/iRoute'
import RecipeRoute from '../routes/recipeRoute'
import AuthenticationService from '../services/authenticationService'
import ModelBinder from '../services/modelBinder'
import RandomNumberGenerator from '../services/randomNumberGenerator'
import SERVICE_IDENTIFIERS from './serviceIdentifiers'

const container = new Container()

// REGISTER SERVICES
container
    .bind<RandomNumberGenerator>(SERVICE_IDENTIFIERS.RandomNumberGenerator)
    .to(RandomNumberGenerator)

container
    .bind<AuthenticationService>(SERVICE_IDENTIFIERS.AuthenticationService)
    .to(AuthenticationService)

container
    .bind<ModelBinder>(SERVICE_IDENTIFIERS.ModelBinder)
    .to(ModelBinder)

// REGISTER REPOSITORIES
container
    .bind<IAccountRepository>(SERVICE_IDENTIFIERS.IAccountRepository)
    .to(AccountRepository)

container
    .bind<IRecipeRepository>(SERVICE_IDENTIFIERS.IRecipeRepository)
    .to(RecipeRepository)

// REGISTER CONTROLLERS
container
    .bind<AccountController>(SERVICE_IDENTIFIERS.AccountController)
    .to(AccountController)

container
    .bind<RecipeController>(SERVICE_IDENTIFIERS.RecipeController)
    .to(RecipeController)

// REGISTER ROUTES
container
    .bind<IRoute>(SERVICE_IDENTIFIERS.Routes)
    .to(AccountRoute)

container
    .bind<IRoute>(SERVICE_IDENTIFIERS.Routes)
    .to(RecipeRoute)

// REGISTER APPLICATION
container
    .bind<Application>(SERVICE_IDENTIFIERS.Application)
    .to(Application)

export default container