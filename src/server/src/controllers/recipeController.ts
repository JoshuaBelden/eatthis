import { Request } from 'express'
import { inject, injectable } from 'inversify'
import RecipeRepository from '../data/RecipeRepository'
import dependencyIdentifiers from '../dependencyIdentifiers'
import { Recipe } from '../models/recipe'
import Result from '../models/result'
import AuthenticatoinService from '../services/authenticationService'

@injectable()
export default class RecipeController {

    private recipeRepository: RecipeRepository

    constructor(
        @inject(dependencyIdentifiers.RecipeRepository) repo: RecipeRepository) {
        this.recipeRepository = repo
    }

    public async getAsync(userId: string, recipeId: string): Promise<Result<Recipe>> {
        try {
            return new Result<Recipe>(true, await this.recipeRepository.getAsync(userId, recipeId))
        }
        catch (error) {
            return new Result<Recipe>(false, null, error)
        }
    }

    public async getForUserAsync(userId: string) : Promise<Result<Array<Recipe>>> {
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