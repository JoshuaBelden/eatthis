import { Container } from 'inversify';
import 'reflect-metadata';

import AccountController from './controllers/accountController';
import AccountRepository from './repositories/accountRepository';
import AccountRoute from './routes/accountRoute';
import Application from './application';
import AuthenticationService from './services/authenticationService';
import AuthorizationMiddleware from './services/authorizationMiddleware';
import CommonItemsController from './controllers/commonItemsController';
import CommonItemsRepository from './repositories/commonItemsRepository';
import CommonItemsRoute from './routes/commonItemsRoute';
import config from './environment/environment';
import DepartmentRepository from './repositories/departmentRepository';
import dependencyIdentifiers from './dependencyIdentifiers';
import DocumentController from './controllers/documentController';
import DocumentRepository from './repositories/documentRepository';
import DocumentRoute from './routes/documentRoute';
import GroceryController from './controllers/groceryController';
import GroceryListBuilder from './services/groceryListBuilder';
import GroceryRepository from './repositories/groceryRepository';
import GroceryRoute from './routes/groceryRoute';
import IngredientParser from './services/ingredientParser';
import IRoute from './routes/iRoute';
import MealController from './controllers/mealController';
import MealRepository from './repositories/mealRepository';
import MealRoute from './routes/mealRoute';
import ModelBinder from './services/modelBinder';
import RandomNumberGenerator from './services/randomNumberGenerator';
import RecipeController from './controllers/recipeController';
import RecipeRepository from './repositories/recipeRepository';
import RecipeRoute from './routes/recipeRoute';
import TokenHandler from './services/tokenHandler';
import UnitsOfMeasureRepository from './repositories/unitsOfMeasureRepository';

const container = new Container();

// REGISTER REPOSITORIES
container
    .bind<AccountRepository>(dependencyIdentifiers.AccountRepository)
    .to(AccountRepository);

container
    .bind<DepartmentRepository>(dependencyIdentifiers.DepartmentRepository)
    .to(DepartmentRepository);

container
    .bind<RecipeRepository>(dependencyIdentifiers.RecipeRepository)
    .to(RecipeRepository);

container
    .bind<MealRepository>(dependencyIdentifiers.MealRepository)
    .to(MealRepository);

container
    .bind<GroceryRepository>(dependencyIdentifiers.GroceryRepository)
    .to(GroceryRepository);

container
    .bind<CommonItemsRepository>(dependencyIdentifiers.CommonItemsRepository)
    .to(CommonItemsRepository);

container
    .bind<DocumentRepository>(dependencyIdentifiers.DocumentRepository)
    .to(DocumentRepository).inSingletonScope();

container
    .bind<UnitsOfMeasureRepository>(dependencyIdentifiers.UnitsOfMeasureRepository)
    .to(UnitsOfMeasureRepository).inSingletonScope();

// REGISTER CONTROLLERS
container
    .bind<AccountController>(dependencyIdentifiers.AccountController)
    .to(AccountController);

container
    .bind<RecipeController>(dependencyIdentifiers.RecipeController)
    .to(RecipeController);

container
    .bind<MealController>(dependencyIdentifiers.MealController)
    .to(MealController);

container
    .bind<GroceryController>(dependencyIdentifiers.GroceryController)
    .to(GroceryController);

container
    .bind<CommonItemsController>(dependencyIdentifiers.CommonItemsController)
    .to(CommonItemsController);

container
    .bind<DocumentController>(dependencyIdentifiers.DocumentController)
    .to(DocumentController);

// REGISTER ROUTES
container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(AccountRoute);

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(RecipeRoute);

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(MealRoute);

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(GroceryRoute);

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(CommonItemsRoute);

container
    .bind<IRoute>(dependencyIdentifiers.Routes)
    .to(DocumentRoute);

// REGISTER SERVICES
container
    .bind<RandomNumberGenerator>(dependencyIdentifiers.RandomNumberGenerator)
    .to(RandomNumberGenerator);

container
    .bind<TokenHandler>(dependencyIdentifiers.TokenHandler)
    .toConstructor(TokenHandler)
    .onActivation(context => new TokenHandler(config.security.secret, config.security.tokenExpiration));

container
    .bind<AuthenticationService>(dependencyIdentifiers.AuthenticationService)
    .to(AuthenticationService);

container
    .bind<IngredientParser>(dependencyIdentifiers.IngredientParser)
    .to(IngredientParser);

container
    .bind<ModelBinder>(dependencyIdentifiers.ModelBinder)
    .to(ModelBinder);

container
    .bind<GroceryListBuilder>(dependencyIdentifiers.GroceryListbuilder)
    .to(GroceryListBuilder);

// REGISTER MIDDLEWARE
container
    .bind<AuthorizationMiddleware>(dependencyIdentifiers.AuthorizationMiddleware)
    .to(AuthorizationMiddleware)
    .inSingletonScope();

// REGISTER APPLICATION
container
    .bind<Application>(dependencyIdentifiers.Application)
    .to(Application);

export default container;
