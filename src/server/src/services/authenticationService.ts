import { Request } from 'express'
import { inject, injectable } from 'inversify'
import dependencyIdentifiers from '../dependencyIdentifiers'
import AuthToken from '../models/authToken'
import Result from '../models/result'
import User from '../models/user'
import TokenHandler from './tokenHandler'

@injectable()
export default class AuthenticationService {

  private tokenHandler: TokenHandler

  public constructor(
    @inject(dependencyIdentifiers.TokenHandler) tokenHandler: TokenHandler) {
    this.tokenHandler = tokenHandler
  }

  public authorizeUser(user: User): Result<AuthToken> {
    return new Result<AuthToken>(true, new AuthToken(
      this.tokenHandler.tokenExpiration,
      user.firstName,
      user.lastName,
      user.email,
      this.tokenHandler.sign(user)))
  }

  public getAuthorizedUser(request: Request): Result<User> {
    try {
      return new Result<User>(true, this.tokenHandler.verify(this.tokenHandler.readTokenFromHeader(request)) as User);
    } catch (error) {
      return new Result<User>(false, null, error)
    }
  }
}