import { Container } from 'inversify'
import "reflect-metadata"
import Application from './application'
import AccountController from './controllers/accountController'
import RecipeController from './controllers/recipeController'
import AccountRepository from './data/accountRepository'
import IAccountRepository from './data/IAccountRepository'
import IRecipeRepository from './data/iRecipeRepository'
import RecipeRepository from './data/recipeRepository'
import dependencyIdentifiers from './dependencyIdentifiers'
import config from './environments/config'
import AccountRoute from './routes/accountRoute'
import IRoute from './routes/iRoute'
import RecipeRoute from './routes/recipeRoute'
import AuthenticationService from './services/authenticationService'
import ModelBinder from './services/modelBinder'
import RandomNumberGenerator from './services/randomNumberGenerator'
import TokenHandler from './services/tokenHandler'

const container = new Container()

// REGISTER SERVICES
container
    .bind<RandomNumberGenerator>(dependencyIdentifiers.RandomNumberGenerator)
    .to(RandomNumberGenerator)

container
    .bind<TokenHandler>(dependencyIdentifiers.TokenHandler)
    .toConstructor(TokenHandler)
    .onActivation(context => new TokenHandler(config.security.secret, config.security.tokenExpiration))

container
    .bind<AuthenticationService>(dependencyIdentifiers.AuthenticationService)
    .to(AuthenticationService)

container
    .bind<ModelBinder>(dependencyIdentifiers.ModelBinder)
    .to(ModelBinder)

// REGISTER REPOSITORIES
container
    .bind<IAccountRepository>(dependencyIdentifiers.IAccountRepository)
    .to(AccountRepository)

container
    .bind<IRecipeRepository>(dependencyIdentifiers.IRecipeRepository)
    .to(RecipeRepository)

// REGISTER CONTROLLERS
container
    .bind<AccountController>(dependencyIdentifiers.AccountController)
    .to(AccountController)

container
    .bind<RecipeController>(dependencyIdentifiers.RecipeController)
    .to(RecipeController)

// REGISTER ROUTES
container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(AccountRoute)

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(RecipeRoute)

// REGISTER APPLICATION
container
    .bind<Application>(dependencyIdentifiers.Application)
    .to(Application)

export default container