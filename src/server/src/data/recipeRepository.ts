import { inject, injectable } from 'inversify';
import * as Mongo from 'mongodb'
import SERVICE_IDENTIFIERS from '../dependencies/serviceIdentifiers';
import config from '../environments/config'
import { Recipe } from '../models/recipe';
import RandomNumberGenerator from '../services/randomNumberGenerator';
import IRecipeRepository from './iRecipeRepository';

const url = 'mongodb://localhost:27017'
const dbName = config.database.name
const collectionName = 'recipes'

@injectable()
export default class RecipeRepository implements IRecipeRepository {

    private randomNumberGenerator: RandomNumberGenerator

    public constructor(
        @inject(SERVICE_IDENTIFIERS.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator
    }

    public getByUserId(userId: string): Promise<Array<Recipe>> {
        return new Promise<Array<Recipe>>((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    reject(connectError)
                    return
                }

                const recipes = await client
                    .db(dbName)
                    .collection(collectionName)
                    .find<Recipe>({ id: userId })
                    .toArray()

                if (!recipes) {
                    resolve(null)
                    return
                }

                resolve(recipes)
            })
        })
    }

    public create(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    return reject(connectError)
                }

                await client
                    .db(dbName)
                    .collection(collectionName)
                    .insertOne({
                        id: this.randomNumberGenerator.generateGuid(),
                        userId: recipe.userId,
                        title: recipe.title,
                        description: recipe.description,
                        ingredients: recipe.ingredients.map(r => {
                            return {
                                id: this.randomNumberGenerator.generateGuid(),
                                title: r.title
                            }
                        })
                    })

                resolve(recipe)
            })
        })
    }
}