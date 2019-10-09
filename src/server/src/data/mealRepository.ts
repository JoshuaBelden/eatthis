import { inject, injectable } from 'inversify';
import { Moment } from 'moment';
import * as Mongo from 'mongodb'
import serviceIdentity from '../dependencyIdentifiers'
import config from '../environments/config'
import Meal from '../models/meal';
import RandomNumberGenerator from '../services/randomNumberGenerator';

const url = 'mongodb://localhost:27017'
const dbName = config.database.name
const collectionName = 'meals'

@injectable()
export default class MealRepository {

    private randomNumberGenerator: RandomNumberGenerator

    public constructor(
        @inject(serviceIdentity.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator
    }

    public getAsync(userId: string, startDate: Date, endDate: Date): Promise<Array<Meal>> {
        return new Promise<Array<Meal>>((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {
                try {
                    if (connectError) {
                        reject(connectError)
                        return
                    }

                    const meals = await client
                        .db(dbName)
                        .collection(collectionName)
                        .find<Meal>({
                            userId,
                            occurs: {
                                "$gte": startDate,
                                "$lte": endDate
                            }
                        })
                        .toArray()

                    resolve(meals)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    public createAsync(userId: string, meal: Meal): Promise<Meal> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {
                try {
                    if (connectError) {
                        return reject(connectError)
                    }

                    meal.userId = userId
                    meal.id = this.randomNumberGenerator.generateGuid()

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .insertOne(meal)

                    resolve(meal)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    public updateAsync(userId: string, meal: Meal): Promise<Meal> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {
                try {

                    if (connectError) {
                        return reject(connectError)
                    }

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndReplace({
                            id: meal.id,
                            userId
                        }, meal)

                    resolve(meal)
                }
                catch (error) {
                    reject(error)
                }
            })
        })
    }

    public deleteAsync(userId: string, id: string): Promise<void> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {
                try {

                    if (connectError) {
                        return reject(connectError)
                    }

                    await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOneAndDelete({
                            id,
                            userId
                        })

                    resolve()
                }
                catch (error) {
                    reject(error)
                }
            })
        })
    }
}