import { inject, injectable } from 'inversify'
import RecipeRepository from '../data/RecipeRepository'
import dependencyIdentifiers from '../dependencyIdentifiers'
import { Recipe } from '../models/recipe'
import Result from '../models/result'

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

    public async createAsync(userId: string, recipe: Recipe) : Promise<Result<Recipe>> {
        if (recipe.title.length === 0) {
            return new Result<Recipe>(false, null, 'Recipe title is required.')
        }

        try {
            return new Result<Recipe>(true, await this.recipeRepository.createAsync(userId, recipe))
        } catch (error) {
            return new Result<Recipe>(false, null, error)
        }
    }

    public async updateAsync(userId: string, recipe: Recipe) : Promise<Result<Recipe>> {
        try {
            return new Result<Recipe>(true, await this.recipeRepository.updateAsync(userId, recipe))
        } catch (error) {
            return new Result<Recipe>(false, null, error)
        }
    }

    public async deleteAsync(userId: string, id: string) : Promise<Result<void>> {
        try {
            return new Result<void>(true, await this.recipeRepository.deleteAsync(userId, id))
        } catch (error) {
            return new Result<void>(false, null, error)
        }
    }
}