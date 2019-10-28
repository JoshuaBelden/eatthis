export default {

    // SERVICES
    AuthenticationService: Symbol('AuthenticationService'),
    IngredientParser: Symbol('IngredientParser'),
    TokenHandler: Symbol('TokenHandler'),
    RandomNumberGenerator: Symbol('RandomNumberGenerator'),
    ModelBinder: Symbol('ModelBinder'),
    GroceryListbuilder: Symbol('GroceryListBuilder'),

    // REPOSITORIES
    AccountRepository: Symbol('AccountRepository'),
    DepartmentRepository: Symbol('DepartmentRepository'),
    RecipeRepository: Symbol('RecipeRepository'),
    MealRepository: Symbol('MealRepository'),
    GroceryRepository: Symbol('GroceryRepository'),

    // CONTROLLERS
    AccountController: Symbol('AccountController'),
    RecipeController: Symbol('RecipeController'),
    MealController: Symbol('MealController'),
    GroceryController: Symbol('GroceryController'),

    // ROUTES
    Routes: Symbol('Routes'),

    // APPLICATION
    Application: Symbol('Application'),
};
