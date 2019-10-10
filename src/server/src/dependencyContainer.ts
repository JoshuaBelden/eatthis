import { Container } from 'inversify'
import "reflect-metadata"
import Application from './application'
import AccountController from './controllers/accountController'
import MealController from './controllers/mealController'
import RecipeController from './controllers/recipeController'
import AccountRepository from './data/accountRepository'
import MealRepository from './data/mealRepository'
import RecipeRepository from './data/recipeRepository'
import dependencyIdentifiers from './dependencyIdentifiers'
import config from './environments/config'
import Meal from './models/meal'
import AccountRoute from './routes/accountRoute'
import IRoute from './routes/iRoute'
import MealRoute from './routes/mealRoute'
import RecipeRoute from './routes/recipeRoute'
import AuthenticationService from './services/authenticationService'
import ModelBinder from './services/modelBinder'
import RandomNumberGenerator from './services/randomNumberGenerator'
import TokenHandler from './services/tokenHandler'
import GroceryRepository from './data/groceryRepository'
import GroceryController from './controllers/groceryController'
import GroceryRoute from './routes/groceryRoute'

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

container
    .bind<GroceryRepository>(dependencyIdentifiers.GroceryRepository)
    .to(GroceryRepository)

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

container
    .bind<GroceryController>(dependencyIdentifiers.GroceryController)
    .to(GroceryController)

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

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(GroceryRoute)

// REGISTER APPLICATION
container
    .bind<Application>(dependencyIdentifiers.Application)
    .to(Application)

export default container