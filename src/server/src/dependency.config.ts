import { Container } from 'inversify'
import "reflect-metadata"
import Application from './application'
import AccountController from './controllers/accountController'
import RecipeController from './controllers/recipeController'
import AccountRepository from './data/accountRepository'
import IAccountRepository from './data/IAccountRepository'
import IRecipeRepository from './data/iRecipeRepository'
import RecipeRepository from './data/recipeRepository'
import config from './environments/config'
import AccountRoute from './routes/accountRoute'
import IRoute from './routes/iRoute'
import RecipeRoute from './routes/recipeRoute'
import AuthenticationService from './services/authenticationService'
import ModelBinder from './services/modelBinder'
import RandomNumberGenerator from './services/randomNumberGenerator'
import TokenHandler from './services/tokenHandler'

export const serviceIdentity = {
    
    // SERVICES
    AuthenticationService: Symbol("AuthenticationService"),
    TokenHandler: Symbol("TokenHandler"),
    RandomNumberGenerator: Symbol("RandomNumberGenerator"),
    ModelBinder: Symbol("ModelBinder"),

    // REPOSITORIES
    IAccountRepository: Symbol("IAccountRepository"),
    IRecipeRepository: Symbol("IRecipeRepository"),

    // CONTROLLERS
    AccountController: Symbol("AccountController"),
    RecipeController: Symbol("RecipeController"),

    // ROUTES
    Routes: Symbol("Routes"),

    // APPLICATION
    Application: Symbol("Application"),
}

export const container = new Container()

// REGISTER SERVICES
container
    .bind<RandomNumberGenerator>(serviceIdentity.RandomNumberGenerator)
    .to(RandomNumberGenerator)

container
    .bind<TokenHandler>(serviceIdentity.TokenHandler)
    .toConstructor(TokenHandler)
    .onActivation(context => new TokenHandler(config.security.secret, config.security.tokenExpiration))

container
    .bind<AuthenticationService>(serviceIdentity.AuthenticationService)
    .to(AuthenticationService)

container
    .bind<ModelBinder>(serviceIdentity.ModelBinder)
    .to(ModelBinder)

// REGISTER REPOSITORIES
container
    .bind<IAccountRepository>(serviceIdentity.IAccountRepository)
    .to(AccountRepository)

container
    .bind<IRecipeRepository>(serviceIdentity.IRecipeRepository)
    .to(RecipeRepository)

// REGISTER CONTROLLERS
container
    .bind<AccountController>(serviceIdentity.AccountController)
    .to(AccountController)

container
    .bind<RecipeController>(serviceIdentity.RecipeController)
    .to(RecipeController)

// REGISTER ROUTES
container
    .bind<IRoute>(serviceIdentity.Routes)
    .to(AccountRoute)

container
    .bind<IRoute>(serviceIdentity.Routes)
    .to(RecipeRoute)

// REGISTER APPLICATION
container
    .bind<Application>(serviceIdentity.Application)
    .to(Application)