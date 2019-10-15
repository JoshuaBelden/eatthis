import { inject, injectable } from 'inversify'
import GroceryRepository from '../data/GroceryRepository'
import dependencyIdentifiers from '../dependencyIdentifiers'
import Grocery from '../models/grocery'
import Result from '../models/result'

@injectable()
export default class GroceryController {

    private groceryRepository: GroceryRepository

    constructor(
        @inject(dependencyIdentifiers.GroceryRepository) groceryRepository: GroceryRepository) {
        this.groceryRepository = groceryRepository
    }

    public async getAsync(userId: string, groceryId: string): Promise<Result<Grocery>> {
        try {
            return new Result<Grocery>(true, await this.groceryRepository.getAsync(userId, groceryId))
        }
        catch (error) {
            return new Result<Grocery>(false, null, error)
        }
    }

    public async getForUserAsync(userId: string) : Promise<Result<Array<Grocery>>> {
        try {
            return new Result<Array<Grocery>>(true, await this.groceryRepository.getByUserIdAsync(userId))
        }
        catch (error) {
            return new Result<Array<Grocery>>(false, null, error)
        }
    }

    public async createAsync(userId: string, grocery: Grocery) : Promise<Result<Grocery>> {
        try {
            return new Result<Grocery>(true, await this.groceryRepository.createAsync(userId, grocery))
        } catch (error) {
            return new Result<Grocery>(false, null, error)
        }
    }

    public async updateAsync(userId: string, grocery: Grocery) : Promise<Result<Grocery>> {
        try {
            return new Result<Grocery>(true, await this.groceryRepository.updateAsync(userId, grocery))
        } catch (error) {
            return new Result<Grocery>(false, null, error)
        }
    }

    public async deleteAsync(userId: string, id: string) : Promise<Result<void>> {
        try {
            return new Result<void>(true, await this.groceryRepository.deleteAsync(userId, id))
        } catch (error) {
            return new Result<void>(false, null, error)
        }
    }
}