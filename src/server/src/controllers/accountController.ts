import { inject, injectable } from 'inversify'
import IAccountRepository from '../data/IAccountRepository'
import SERVICE_IDENTIFIERS from '../dependencies/serviceIdentifiers'
import Result from '../models/result'
import User from '../models/user'
import AuthenticationService from '../services/authenticationService'

@injectable()
export default class AccountController {

  private accountRepository: IAccountRepository
  private authenticatonService: AuthenticationService

  constructor(
    @inject(SERVICE_IDENTIFIERS.IAccountRepository) repo: IAccountRepository,
    @inject(SERVICE_IDENTIFIERS.AuthenticationService) authenticatonService: AuthenticationService) {
    this.accountRepository = repo
    this.authenticatonService = authenticatonService
  }

  public async loginAsync(email: string, password: string): Promise<Result<any>> {
    try {
      const user = await this.accountRepository.loginAsync(email, password)
      if (!user) {
        return new Result<any>(false, null, "User not found.")
      }
      
      const token = this.authenticatonService.createToken(user)
      return new Result<any>(true, token)
    } catch (error) {
      return new Result<any>(false, null, error)
    }
  }

  public async registerAsync(user: User): Promise<Result<User>> {
    try {
      const result = await this.accountRepository.registerAsync(user)
      return new Result<User>(true, result)
    } catch (error) {
        return new Result<User>(false, null, error)
    }
  }  
}
