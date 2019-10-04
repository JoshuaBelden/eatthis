import { inject, injectable } from 'inversify';
import * as Mongo from 'mongodb'
import serviceIdentity from '../dependencyIdentifiers'
import config from '../environments/config'
import { Recipe } from '../models/recipe';
import RandomNumberGenerator from '../services/randomNumberGenerator';

const url = 'mongodb://localhost:27017'
const dbName = config.database.name
const collectionName = 'recipes'

@injectable()
export default class RecipeRepository {

    private randomNumberGenerator: RandomNumberGenerator

    public constructor(
        @inject(serviceIdentity.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator
    }

    public getAsync(userId: string, recipeId: string): Promise<Recipe> {
        return new Promise<Recipe>((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    reject(connectError)
                    return
                }

                const recipe = await client
                    .db(dbName)
                    .collection(collectionName)
                    .findOne<Recipe>({ id: recipeId, userId })

                if (!recipe) {
                    resolve(null)
                    return
                }

                resolve(recipe)
            })
        })
    }

    public getByUserIdAsync(userId: string): Promise<Array<Recipe>> {
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
                    .find<Recipe>({ userId })
                    .toArray()

                if (!recipes) {
                    resolve(null)
                    return
                }

                resolve(recipes)
            })
        })
    }

    public createAsync(recipe: Recipe): Promise<Recipe> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    return reject(connectError)
                }

                recipe.id = this.randomNumberGenerator.generateGuid()
                recipe.ingredients = recipe.ingredients.map(i => {
                    i.id = this.randomNumberGenerator.generateGuid()
                    return i
                })

                await client
                    .db(dbName)
                    .collection(collectionName)
                    .insertOne(recipe)

                resolve(recipe)
            })
        })
    }
}