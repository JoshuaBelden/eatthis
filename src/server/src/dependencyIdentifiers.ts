export default {

    // SERVICES
    AuthenticationService: Symbol('AuthenticationService'),
    IngredientParser: Symbol('IngredientParser'),
    TokenHandler: Symbol('TokenHandler'),
    RandomNumberGenerator: Symbol('RandomNumberGenerator'),
    ModelBinder: Symbol('ModelBinder'),
    GroceryListbuilder: Symbol('GroceryListBuilder'),

    // MIDDLEWARE
    AuthorizationMiddleware: Symbol('AuthorizationMiddleware'),

    // REPOSITORIES
    AccountRepository: Symbol('AccountRepository'),
    DepartmentRepository: Symbol('DepartmentRepository'),
    RecipeRepository: Symbol('RecipeRepository'),
    MealRepository: Symbol('MealRepository'),
    GroceryRepository: Symbol('GroceryRepository'),
    CommonItemsRepository: Symbol('CommonItemsRepository'),
    DocumentRepository: Symbol('DocumentRepository'),
    UnitsOfMeasureRepository: Symbol('UnitsOfMeasureRepository'),

    // CONTROLLERS
    AccountController: Symbol('AccountController'),
    RecipeController: Symbol('RecipeController'),
    MealController: Symbol('MealController'),
    GroceryController: Symbol('GroceryController'),
    CommonItemsController: Symbol('CommonItemsController'),
    DocumentController: Symbol('DocumentController'),

    // ROUTES
    Routes: Symbol('Routes'),

    // APPLICATION
    Application: Symbol('Application'),
};
