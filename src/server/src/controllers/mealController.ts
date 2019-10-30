import { inject, injectable } from 'inversify';

import dependencyIdentifiers from '../dependencyIdentifiers';
import Meal from '../models/meal';
import MealRepository from '../repositories/MealRepository';
import Result from '../models/result';

@injectable()
export default class MealController {

    private mealRepository: MealRepository;

    constructor(
        @inject(dependencyIdentifiers.MealRepository) repo: MealRepository) {
        this.mealRepository = repo;
    }

    public async getAsync(userId: string, startDate: Date, stopDate: Date): Promise<Result<Array<Meal>>> {
        const response = await this.mealRepository.getAsync(userId, startDate, stopDate);
        return new Result<Array<Meal>>(true, response);
    }

    public async createAsync(userId: string, meal: Meal): Promise<Result<Meal>> {
        return new Result<Meal>(true, await this.mealRepository.createAsync(userId, meal));
    }

    public async deleteAsync(userId: string, id: string): Promise<Result<void>> {
        return new Result<void>(true, await this.mealRepository.deleteAsync(userId, id));
    }
}
