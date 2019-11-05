import { inject, injectable } from 'inversify';

import AuthenticationService from './authenticationService';
import dependencyIdentifiers from '../dependencyIdentifiers';

@injectable()
export default class AuthorizationMiddleware {

    static AuthenticatedUserKey = 'AuthenticatedUser';

    private pathIgnores = ['/api/account/login', '/api/account/register'];
    private authenticationService: AuthenticationService;

    public constructor(
        @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticationService
    ) {
        this.authenticationService = authenticationService;
    }

    public build() {
        return (request, response, next) => {
            if (this.pathIgnores.includes(request.path)) {
                return next();
            }

            const authResult = this.authenticationService.readToken(request);
            if (!authResult.success) {
                return response.status(401).send(authResult.error);
            }

            request[AuthorizationMiddleware.AuthenticatedUserKey] = authResult.value;

            next();
        };
    }
}
