import { Request } from 'express'
import { inject, injectable } from 'inversify'
import { serviceIdentity } from '../dependency.config'
import User from '../models/user'
import TokenHandler from './tokenHandler'

@injectable()
export default class AuthenticationService {

  private tokenHandler: TokenHandler

  public constructor(
    @inject(serviceIdentity.TokenHandler) tokenHandler: TokenHandler) {
    this.tokenHandler = tokenHandler
  }
  
  public authorizeUser(user: User): object {
    return {
      expiresIn: this.tokenHandler.tokenExpiration,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: this.tokenHandler.sign(user),
    };
  }

  public getAuthorizedUser(request: Request): User {
    return this.tokenHandler.verify(this.tokenHandler.readTokenFromHeader(request)) as User;
  }
}