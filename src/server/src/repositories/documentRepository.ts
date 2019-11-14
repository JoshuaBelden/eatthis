import { injectable } from 'inversify';
import * as Mongo from 'mongodb';
import config from '../environment/environment';
import IDocument from '../models/document';

const url = 'mongodb://localhost:27017';
const dbName = config.database.name;
const collectionName = 'documents';

@injectable()
export default class DocumentRepository {

    public async getAsync(contentType: string): Promise<IDocument> {
        return new Promise<IDocument>((resolve, reject) => {

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

                    const document = await client
                        .db(dbName)
                        .collection(collectionName)
                        .findOne({
                            contentType
                        });

                    resolve(document);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    public async updateAsync(document: IDocument): Promise<IDocument> {
        return new Promise<IDocument>((resolve, reject) => {

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
                        .replaceOne({
                            contentType: document.contentType
                        }, document, { upsert: true });

                    resolve(document);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}
