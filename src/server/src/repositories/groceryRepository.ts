import { inject, injectable } from 'inversify';
import * as Moment from 'moment';
import * as Mongo from 'mongodb';
import serviceIdentity from '../dependencyIdentifiers';
import config from '../environments/config';
import Grocery from '../models/grocery';
import { GroceryItem } from '../models/groceryItem';
import RandomNumberGenerator from '../services/randomNumberGenerator';

const url = 'mongodb://localhost:27017';
const dbName = config.database.name;
const collectionName = 'groceries';

@injectable()
export default class GroceryRepository {

    private randomNumberGenerator: RandomNumberGenerator;

    public constructor(
        @inject(serviceIdentity.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public async getAsync(userId: string, groceryId: string): Promise<Grocery> {
        return new Promise<Grocery>((resolve, reject) => {

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

                    const grocery = await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOne<Grocery>({ id: groceryId, userId });

                    if (!grocery) {
                        resolve(null);
                        return;
                    }

                    resolve(grocery);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async getByUserIdAsync(userId: string): Promise<Array<Grocery>> {
        return new Promise<Array<Grocery>>((resolve, reject) => {

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

                    const grocerys = await client
                        .db(dbName)
                        .collection(collectionName)
                        .find<Grocery>({ userId })
                        .toArray();

                    if (!grocerys) {
                        resolve(null);
                        return;
                    }

                    resolve(grocerys);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async createAsync(userId: string, grocery: Grocery): Promise<Grocery> {
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

                    grocery.userId = userId;
                    grocery.id = this.randomNumberGenerator.generateGuid();
                    grocery.startDate = new Date(Moment(grocery.startDate).toISOString());
                    grocery.stopDate = new Date(Moment(grocery.stopDate).toISOString());
                    for (const groceryItem of grocery.items) {
                        groceryItem.id = this.randomNumberGenerator.generateGuid();
                    }

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .insertOne(grocery);

                    resolve(grocery);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async deleteAsync(userId: string, id: string): Promise<void> {
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

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndDelete({
                            id,
                            userId
                        });

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async createGroceryItemAsync(userId: string, grocery: Grocery, groceryItem: GroceryItem): Promise<GroceryItem> {
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

                    groceryItem.id = this.randomNumberGenerator.generateGuid();
                    grocery.items.push(groceryItem);

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndReplace({
                            id: grocery.id,
                            userId
                        }, grocery);

                    resolve(groceryItem);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async updateGroceryItemAsync(userId: string, grocery: Grocery, groceryItem: GroceryItem): Promise<GroceryItem> {
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

                    grocery.items = grocery.items.filter(gi => gi.id !== groceryItem.id);
                    grocery.items.push(groceryItem);

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndReplace({
                            id: grocery.id,
                            userId
                        }, grocery);

                    resolve(groceryItem);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async deleteGroceryItemAsync(userId: string, grocery: Grocery, groceryItemId: string): Promise<void> {
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

                    grocery.items = grocery.items.filter(groceryItem => groceryItem.id !== groceryItemId);

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndReplace({
                            id: grocery.id,
                            userId
                        }, grocery);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}
