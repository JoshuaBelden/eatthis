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

    // CONTROLLERS
    AccountController: Symbol("AccountController"),
    RecipeController: Symbol("RecipeController"),
    MealController: Symbol("MealController"),

    // ROUTES
    Routes: Symbol("Routes"),

    // APPLICATION
    Application: Symbol("Application"),
}