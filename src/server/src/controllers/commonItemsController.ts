import { inject, injectable } from 'inversify';

import CommonItems from '../models/commonItems';
import CommonItemsRepository from '../repositories/commonItemsRepository';
import dependencyIdentifiers from '../dependencyIdentifiers';
import Result from '../models/result';

@injectable()
export default class CommonItemsController {

    private commonItemsRepository: CommonItemsRepository;

    constructor(
        @inject(dependencyIdentifiers.CommonItemsRepository) commonItemsRepository: CommonItemsRepository) {
            this.commonItemsRepository = commonItemsRepository;
    }

    public async getForUserAsync(userId: string): Promise<Result<CommonItems>> {
        return new Result<CommonItems>(true, await this.commonItemsRepository.getByUserIdAsync(userId));
    }

    public async updateAsync(userId: string, items: string[]): Promise<Result<CommonItems>> {
        const commonItems = new CommonItems();
        commonItems.userId = userId;
        commonItems.items = items;

        return new Result<CommonItems>(true, await this.commonItemsRepository.updateAsync(userId, commonItems));
    }
}
