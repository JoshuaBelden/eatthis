const SERVICE_IDENTIFIERS = {
    // SERVICES
    RandomNumberGenerator: Symbol("RandomNumberGenerator"),
    AuthenticationService: Symbol("AuthenticationService"),
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

export default SERVICE_IDENTIFIERS