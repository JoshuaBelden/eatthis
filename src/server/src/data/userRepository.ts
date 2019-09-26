import { injectable } from "inversify"
import * as Mongo from 'mongodb'
import IUserRepository from '../data/iUserRepository'
import User from '../model/user'

const url = 'mongodb://localhost:27017'
const dbName = 'starter-api'
const collectionName = 'users'

@injectable()
export default class UserRepository implements IUserRepository {

    public getByUsername(username: string): Promise<User> {
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
                    .findOne({ "username": username })

                if (!user) {
                    resolve(null)
                    return
                }

                resolve({
                    email: user.email,
                    firstName: user.firstName,
                    id: user.id,
                    lastName: user.lastName,
                    password: user.password,
                    phone: user.phone,
                    username: user.username,
                })
            })
        })
    }
    
    public insert(user: User) : Promise<User> {
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
                        password: user.password,
                        phone: user.phone,
                        username: user.username,
                    })

                resolve(user)
            })
        })
    }

    public update(user: User) : Promise<User> {
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

                const filter = { id: user.id }

                await client
                    .db(dbName)
                    .collection(collectionName)
                    .updateOne(filter, {
                        email: user.email,
                        firstName: user.firstName,
                        id: user.id,
                        lastName: user.lastName,
                        password: user.password,
                        phone: user.phone,
                        username: user.username,
                    })

                resolve(user)
            })
        })
    }

    public delete(username: string) : Promise<void> {
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
                    .deleteOne({
                        username: username
                    })

                resolve()
            })
        })
    }
}