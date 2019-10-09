import { Container } from 'inversify'
import "reflect-metadata"
import Application from './application'
import AccountController from './controllers/accountController'
import RecipeController from './controllers/recipeController'
import AccountRepository from './data/accountRepository'
import MealRepository from './data/mealRepository'
import RecipeRepository from './data/recipeRepository'
import dependencyIdentifiers from './dependencyIdentifiers'
import config from './environments/config'
import AccountRoute from './routes/accountRoute'
import IRoute from './routes/iRoute'
import MealRoute from './routes/mealRoute'
import RecipeRoute from './routes/recipeRoute'
import AuthenticationService from './services/authenticationService'
import ModelBinder from './services/modelBinder'
import RandomNumberGenerator from './services/randomNumberGenerator'
import TokenHandler from './services/tokenHandler'
import MealController from './controllers/mealController'
import Meal from './models/meal'

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
    .bind<AccountRepository>(dependencyIdentifiers.AccountRepository)
    .to(AccountRepository)

container
    .bind<RecipeRepository>(dependencyIdentifiers.RecipeRepository)
    .to(RecipeRepository)

    container
    .bind<MealRepository>(dependencyIdentifiers.MealRepository)
    .to(MealRepository)

// REGISTER CONTROLLERS
container
    .bind<AccountController>(dependencyIdentifiers.AccountController)
    .to(AccountController)

container
    .bind<RecipeController>(dependencyIdentifiers.RecipeController)
    .to(RecipeController)

container
    .bind<MealController>(dependencyIdentifiers.MealController)
    .to(MealController)

// REGISTER ROUTES
container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(AccountRoute)

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(RecipeRoute)

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(MealRoute)

// REGISTER APPLICATION
container
    .bind<Application>(dependencyIdentifiers.Application)
    .to(Application)

export default container