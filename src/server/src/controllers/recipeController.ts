import { inject, injectable } from 'inversify'
import IRecipeRepository from '../data/iRecipeRepository'
import SERVICE_IDENTIFIERS from '../dependencies/serviceIdentifiers'
import { Recipe } from '../models/recipe'
import Result from '../models/result'

@injectable()
export default class RecipeController {

    private recipeRepository: IRecipeRepository

    constructor(@inject(SERVICE_IDENTIFIERS.IRecipeRepository) repo: IRecipeRepository) {
        this.recipeRepository = repo
    }

    public async createAsync(recipe: Recipe) : Promise<Result<Recipe>> {
        try {
            const result = await this.recipeRepository.createAsync(recipe)
            return new Result<Recipe>(true, result)
        } catch (error) {
            return new Result<Recipe>(false, null, error)
        }
    }
}