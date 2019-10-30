import * as express from 'express';

import AuthorizationMiddleware from '../services/authorizationMiddleware';
import IRoute from './iRoute';
import Result from '../models/result';
import User from '../models/user';
import { injectable } from 'inversify';

@injectable()
export default abstract class BaseRoute implements IRoute {

    abstract configure(app: express.Application): void;

    public getAuthenticatedUser(request): User {
        return request[AuthorizationMiddleware.AuthenticatedUserKey];
    }

    public tryAction<T>(action): Result<T> {
        try {
            return action();
        } catch (error) {
            return new Result<T>(false, null, error);
        }
    }

    public buildResponse<T>(response, result: Result<T>) {
        return result.success
            ? response.status(200).send(result.value)
            : response.status(500).send(result.error);
    }
}
