export default {
    
    // SERVICES
    AuthenticationService: Symbol("AuthenticationService"),
    TokenHandler: Symbol("TokenHandler"),
    RandomNumberGenerator: Symbol("RandomNumberGenerator"),
    ModelBinder: Symbol("ModelBinder"),

    // REPOSITORIES
    AccountRepository: Symbol("AccountRepository"),
    RecipeRepository: Symbol("RecipeRepository"),
    MealRepository: Symbol("MealRepository"),
    GroceryRepository: Symbol("GroceryRepository"),

    // CONTROLLERS
    AccountController: Symbol("AccountController"),
    RecipeController: Symbol("RecipeController"),
    MealController: Symbol("MealController"),
    GroceryController: Symbol("GroceryController"),

    // ROUTES
    Routes: Symbol("Routes"),

    // APPLICATION
    Application: Symbol("Application"),
}