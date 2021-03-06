import { inject, injectable } from 'inversify';

import AccountRepository from '../repositories/accountRepository';
import AuthenticationService from '../services/authenticationService';
import AuthToken from '../models/authToken';
import dependencyIdentifiers from '../dependencyIdentifiers';
import Result from '../models/result';
import User from '../models/user';

@injectable()
export default class AccountController {

  private accountRepository: AccountRepository;
  private authenticationService: AuthenticationService;

  constructor(
    @inject(dependencyIdentifiers.AccountRepository) repo: AccountRepository,
    @inject(dependencyIdentifiers.AuthenticationService) authenticationService: AuthenticationService) {
    this.accountRepository = repo;
    this.authenticationService = authenticationService;
  }

  public async loginAsync(email: string, password: string): Promise<Result<AuthToken>> {
    const user = await this.accountRepository.loginAsync(email, this.authenticationService.hashPassword(password));
    return user
      ? new Result<AuthToken>(true, this.authenticationService.createToken(user).value)
      : new Result<AuthToken>(false, null, 'User not found.');
  }

  public async registerAsync(user: User): Promise<Result<User>> {
    user.password = this.authenticationService.hashPassword(user.password);
    return new Result<User>(true, await this.accountRepository.registerAsync(user));
  }
}
