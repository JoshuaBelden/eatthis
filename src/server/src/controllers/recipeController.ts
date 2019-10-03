import { inject, injectable } from 'inversify'
import IRecipeRepository from '../data/iRecipeRepository'
import { serviceIdentity } from '../dependency.config'
import { Recipe } from '../models/recipe'
import Result from '../models/result'

@injectable()
export default class RecipeController {

    private recipeRepository: IRecipeRepository

    constructor(
        @inject(serviceIdentity.IRecipeRepository) repo: IRecipeRepository) {
        this.recipeRepository = repo
    }

    public async createAsync(recipe: Recipe) : Promise<Result<Recipe>> {
        try {

            return new Result<Recipe>(true, await this.recipeRepository.createAsync(recipe))
            
        } catch (error) {
            return new Result<Recipe>(false, null, error)
        }
    }
}