export default {
    
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