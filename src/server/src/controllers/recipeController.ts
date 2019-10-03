import { Request } from 'express'
import { inject, injectable } from 'inversify'
import IRecipeRepository from '../data/iRecipeRepository'
import dependencyIdentifiers from '../dependencyIdentifiers'
import { Recipe } from '../models/recipe'
import Result from '../models/result'
import AuthenticatoinService from '../services/authenticationService'

@injectable()
export default class RecipeController {

    private recipeRepository: IRecipeRepository
    private authenticationService: AuthenticatoinService

    constructor(
        @inject(dependencyIdentifiers.IRecipeRepository) repo: IRecipeRepository,
        @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticatoinService) {
        this.recipeRepository = repo
        this.authenticationService = authenticationService
    }

    public async getAsync(userId: string) : Promise<Result<Array<Recipe>>> {
        try {
            return new Result<Array<Recipe>>(true, await this.recipeRepository.getByUserIdAsync(userId))
        }
        catch (error) {
            return new Result<Array<Recipe>>(false, null, error)
        }
    }

    public async createAsync(recipe: Recipe) : Promise<Result<Recipe>> {
        try {
            return new Result<Recipe>(true, await this.recipeRepository.createAsync(recipe))
        } catch (error) {
            return new Result<Recipe>(false, null, error)
        }
    }
}