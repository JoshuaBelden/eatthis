import { inject, injectable } from 'inversify';
import * as Mongo from 'mongodb';
import CommonItems from '../models/commonItems';
import config from '../environment/environment';
import RandomNumberGenerator from '../services/randomNumberGenerator';
import serviceIdentity from '../dependencyIdentifiers';

const url = 'mongodb://localhost:27017';
const dbName = config.database.name;
const collectionName = 'commonItems';

@injectable()
export default class CommonItemsRepository {

    private randomNumberGenerator: RandomNumberGenerator;

    public constructor(
        @inject(serviceIdentity.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public async getByUserIdAsync(userId: string): Promise<CommonItems> {
        return new Promise<CommonItems>((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {
                try {
                    if (connectError) {
                        reject(connectError);
                        return;
                    }

                    const commonItems = await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOne<CommonItems>({ userId });

                    if (!commonItems) {
                        resolve();
                        return;
                    }

                    resolve(commonItems);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async updateAsync(userId: string, commonItems: CommonItems): Promise<CommonItems> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {
                try {
                    if (connectError) {
                        return reject(connectError);
                    }

                    commonItems.id = this.randomNumberGenerator.generateGuid();
                    commonItems.userId = userId;

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndReplace({userId}, commonItems, { upsert: true });

                    resolve(commonItems);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}
