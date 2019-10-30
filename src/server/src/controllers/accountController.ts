import { inject, injectable } from 'inversify';

import AccountRepository from '../repositories/AccountRepository';
import AuthenticationService from '../services/authenticationService';
import AuthToken from '../models/authToken';
import dependencyIdentifiers from '../dependencyIdentifiers';
import Result from '../models/result';
import User from '../models/user';

@injectable()
export default class AccountController {

  private accountRepository: AccountRepository;
  private authenticatonService: AuthenticationService;

  constructor(
    @inject(dependencyIdentifiers.AccountRepository) repo: AccountRepository,
    @inject(dependencyIdentifiers.AuthenticationService) authenticatonService: AuthenticationService) {
    this.accountRepository = repo;
    this.authenticatonService = authenticatonService;
  }

  public async loginAsync(email: string, password: string): Promise<Result<AuthToken>> {
    const user = await this.accountRepository.loginAsync(email, password);
    return user
      ? new Result<AuthToken>(true, this.authenticatonService.createToken(user).value)
      : new Result<AuthToken>(false, null, 'User not found.');
  }

  public async registerAsync(user: User): Promise<Result<User>> {
    return new Result<User>(true, await this.accountRepository.registerAsync(user));
  }
}
