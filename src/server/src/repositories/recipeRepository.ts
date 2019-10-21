import { inject, injectable } from 'inversify';
import * as Mongo from 'mongodb';
import serviceIdentity from '../dependencyIdentifiers';
import config from '../environments/config';
import Recipe from '../models/recipe';
import RandomNumberGenerator from '../services/randomNumberGenerator';

const url = 'mongodb://localhost:27017';
const dbName = config.database.name;
const collectionName = 'recipes';

@injectable()
export default class RecipeRepository {

    private randomNumberGenerator: RandomNumberGenerator;

    public constructor(
        @inject(serviceIdentity.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public async getAsync(userId: string, recipeId: string): Promise<Recipe> {
        return new Promise<Recipe>((resolve, reject) => {

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

                    const recipe = await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOne<Recipe>({ id: recipeId, userId });

                    if (!recipe) {
                        resolve(null);
                        return;
                    }

                    resolve(recipe);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async getByUserIdAsync(userId: string): Promise<Array<Recipe>> {
        return new Promise<Array<Recipe>>((resolve, reject) => {

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

                    const recipes = await client
                        .db(dbName)
                        .collection(collectionName)
                        .find<Recipe>({ userId })
                        .toArray();

                    if (!recipes) {
                        resolve(null);
                        return;
                    }

                    resolve(recipes);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async createAsync(userId: string, recipe: Recipe): Promise<Recipe> {
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

                    recipe.userId = userId;
                    recipe.id = this.randomNumberGenerator.generateGuid();

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .insertOne(recipe);

                    resolve(recipe);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async updateAsync(userId: string, recipe: Recipe): Promise<Recipe> {
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
                        .findOneAndReplace({
                            id: recipe.id,
                            userId
                        }, recipe);

                    resolve(recipe);
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
}
