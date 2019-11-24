import { inject, injectable } from 'inversify';
import { Request } from 'express';
import * as sha512 from 'js-sha512';
import config from '../environment/environment';

import AuthToken from '../models/authToken';
import dependencyIdentifiers from '../dependencyIdentifiers';
import Result from '../models/result';
import TokenHandler from './tokenHandler';
import User from '../models/user';

@injectable()
export default class AuthenticationService {

  private tokenHandler: TokenHandler;

  public constructor(
    @inject(dependencyIdentifiers.TokenHandler) tokenHandler: TokenHandler) {
    this.tokenHandler = tokenHandler;
  }

  public createToken(user: User): Result<AuthToken> {
    return new Result<AuthToken>(true, new AuthToken(
      this.tokenHandler.tokenExpiration,
      user.firstName,
      user.lastName,
      user.email,
      this.tokenHandler.sign(user)));
  }

  public readToken(request: Request): Result<User> {
    try {
      return new Result<User>(true, this.tokenHandler.verify(this.tokenHandler.readTokenFromHeader(request)) as User);
    } catch (error) {
      return new Result<User>(false, null, error);
    }
  }

  public hashPassword(plainText: string): string {
    return sha512.sha512.hmac(config.security.secret, plainText);
  }
}
