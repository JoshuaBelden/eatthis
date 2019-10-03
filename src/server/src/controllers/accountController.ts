import { inject, injectable } from 'inversify'
import IAccountRepository from '../data/IAccountRepository'
import { serviceIdentity } from '../dependency.config'
import Result from '../models/result'
import User from '../models/user'
import AuthenticationService from '../services/authenticationService'

@injectable()
export default class AccountController {

  private accountRepository: IAccountRepository
  private authenticatonService: AuthenticationService

  constructor(
    @inject(serviceIdentity.IAccountRepository) repo: IAccountRepository,
    @inject(serviceIdentity.AuthenticationService) authenticatonService: AuthenticationService) {
    this.accountRepository = repo
    this.authenticatonService = authenticatonService
  }

  public async loginAsync(email: string, password: string): Promise<Result<any>> {
    try {

      const user = await this.accountRepository.loginAsync(email, password)
      if (!user) {
        return new Result<any>(false, null, "User not found.")
      }

      return new Result<any>(true, this.authenticatonService.authorizeUser(user))

    } catch (error) {
      return new Result<any>(false, null, error)
    }
  }

  public async registerAsync(user: User): Promise<Result<User>> {
    try {
      
      return new Result<User>(true, await this.accountRepository.registerAsync(user))

    } catch (error) {
        return new Result<User>(false, null, error)
    }
  }  
}
