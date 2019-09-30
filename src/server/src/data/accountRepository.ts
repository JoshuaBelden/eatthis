import { injectable } from "inversify"
import * as Mongo from 'mongodb'
import config from '../environments/config'
import User from '../model/user'
import IAccountRepository from './IAccountRepository'

const url = 'mongodb://localhost:27017'
const dbName = config.database.name
const collectionName = 'users'

@injectable()
export default class AccountRepository implements IAccountRepository {

    public login(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    reject(connectError)
                    return
                }

                const user = await client
                    .db(dbName)
                    .collection(collectionName)
                    .findOne({ "email": email })

                if (!user) {
                    resolve(null)
                    return
                }

                if (user.password !== password) {
                    resolve(null)
                    return
                }

                resolve({
                    email: user.email,
                    firstName: user.firstName,
                    id: user.id,
                    lastName: user.lastName,
                    password: user.password
                })
            })
        })
    }
    
    public register(user: User) : Promise<User> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    reject(connectError)
                    return
                }

                await client
                    .db(dbName)
                    .collection(collectionName)
                    .insertOne({
                        email: user.email,
                        firstName: user.firstName,
                        id: user.id,
                        lastName: user.lastName,
                        password: user.password
                    })

                resolve(user)
            })
        })
    }
}