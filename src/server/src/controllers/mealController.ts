import { inject, injectable } from 'inversify'
import MealRepository from '../data/MealRepository'
import dependencyIdentifiers from '../dependencyIdentifiers'
import Meal from '../models/meal'
import Result from '../models/result'

@injectable()
export default class MealController {

    private mealRepository: MealRepository

    constructor(
        @inject(dependencyIdentifiers.MealRepository) repo: MealRepository) {
        this.mealRepository = repo
    }

    public async getAsync(userId: string, startDate: Date, stopDate: Date): Promise<Result<Array<Meal>>> {
        try {
            const response = await this.mealRepository.getAsync(userId, startDate, stopDate)
            return new Result<Array<Meal>>(true, response)
        }
        catch (error) {
            return new Result<Array<Meal>>(false, null, error)
        }
    }

    public async createAsync(userId: string, meal: Meal) : Promise<Result<Meal>> {
        try {
            return new Result<Meal>(true, await this.mealRepository.createAsync(userId, meal))
        } catch (error) {
            return new Result<Meal>(false, null, error)
        }
    }

    public async deleteAsync(userId: string, id: string) : Promise<Result<void>> {
        try {
            return new Result<void>(true, await this.mealRepository.deleteAsync(userId, id))
        } catch (error) {
            return new Result<void>(false, null, error)
        }
    }
}