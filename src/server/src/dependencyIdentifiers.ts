export default {
    
    // SERVICES
    AuthenticationService: Symbol("AuthenticationService"),
    TokenHandler: Symbol("TokenHandler"),
    RandomNumberGenerator: Symbol("RandomNumberGenerator"),
    ModelBinder: Symbol("ModelBinder"),

    // REPOSITORIES
    AccountRepository: Symbol("AccountRepository"),
    RecipeRepository: Symbol("RecipeRepository"),

    // CONTROLLERS
    AccountController: Symbol("AccountController"),
    RecipeController: Symbol("RecipeController"),

    // ROUTES
    Routes: Symbol("Routes"),

    // APPLICATION
    Application: Symbol("Application"),
}