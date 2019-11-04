import { inject, injectable } from 'inversify';
import * as Mongo from 'mongodb';
import dependencyIdentifiers from '../dependencyIdentifiers';
import config from '../environment/environment';
import User from '../models/user';
import RandomNumberGenerator from '../services/randomNumberGenerator';

const url = 'mongodb://localhost:27017';
const dbName = config.database.name;
const collectionName = 'users';

@injectable()
export default class AccountRepository {

    private randomNumberGenerator: RandomNumberGenerator;

    public constructor(
        @inject(dependencyIdentifiers.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public async loginAsync(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    reject(connectError);
                    return;
                }

                const user = await client
                    .db(dbName)
                    .collection(collectionName)
                    .findOne({ email });

                if (!user) {
                    resolve(null);
                    return;
                }

                if (user.password !== password) {
                    resolve(null);
                    return;
                }

                resolve({
                    email: user.email,
                    firstName: user.firstName,
                    id: user.id,
                    lastName: user.lastName,
                    password: user.password
                });
            });
        });
    }

    public async registerAsync(user: User): Promise<User> {
        return new Promise((resolve, reject) => {

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            Mongo.MongoClient.connect(url, options, async (connectError, client) => {

                if (connectError) {
                    reject(connectError);
                    return;
                }

                user.id = this.randomNumberGenerator.generateGuid();

                await client
                    .db(dbName)
                    .collection(collectionName)
                    .insertOne(user);

                resolve(user);
            });
        });
    }
}
