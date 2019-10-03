import { Request } from 'express'
import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import config from '../environments/config'
import User from '../models/user'

@injectable()
export default class AuthenticationService {

  public createToken(user: User) {
    const expiresIn = 60 * 60;
    const secret = config.security.secret;
    return {
      expiresIn,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: jwt.sign(user, secret, { expiresIn }),
    };
  }

  public getAuthorizedUser(request: Request): User {
    try {
      const authorizationHeader = request.headers.authorization
      if (!authorizationHeader) {
        return null
      }

      return jwt.verify(
        authorizationHeader.replace('Bearer ', ''),
        config.security.secret) as User;
    }
    catch {
      return null
    }
  }
}