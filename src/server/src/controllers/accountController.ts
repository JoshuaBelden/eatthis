import { inject, injectable } from 'inversify'
import IAccountRepository from '../data/IAccountRepository'
import dependencyIdentifiers from '../dependencyIdentifiers'
import AuthToken from '../models/authToken'
import Result from '../models/result'
import User from '../models/user'
import AuthenticationService from '../services/authenticationService'

@injectable()
export default class AccountController {

  private accountRepository: IAccountRepository
  private authenticatonService: AuthenticationService

  constructor(
    @inject(dependencyIdentifiers.IAccountRepository) repo: IAccountRepository,
    @inject(dependencyIdentifiers.AuthenticationService) authenticatonService: AuthenticationService) {
    this.accountRepository = repo
    this.authenticatonService = authenticatonService
  }

  public async loginAsync(email: string, password: string): Promise<Result<AuthToken>> {
    try {
      const user = await this.accountRepository.loginAsync(email, password)
      return user
        ? new Result<AuthToken>(true, this.authenticatonService.authorizeUser(user).value)
        : new Result<AuthToken>(false, null, "User not found.")
    } catch (error) { return new Result<AuthToken>(false, null, error) }
  }

  public async registerAsync(user: User): Promise<Result<User>> {
    try {
      return new Result<User>(true, await this.accountRepository.registerAsync(user))
    } catch (error) { return new Result<User>(false, null, error) }
  }
}
