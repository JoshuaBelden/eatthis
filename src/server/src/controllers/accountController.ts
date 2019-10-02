import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import IAccountRepository from '../data/IAccountRepository'
import SERVICE_IDENTIFIERS from '../dependencies/serviceIdentifiers'
import { default as config } from '../environments/config'
import User from '../models/user'
import RandomNumberGenerator from '../services/randomNumberGenerator'

@injectable()
export default class AccountController {

  private accountRepository: IAccountRepository
  private randomNumberGenerator: RandomNumberGenerator

  constructor(
    @inject(SERVICE_IDENTIFIERS.IAccountRepository) repo: IAccountRepository,
    @inject(SERVICE_IDENTIFIERS.RandomNumberGenerator) randomNumberGenerator: RandomNumberGenerator) {
    this.accountRepository = repo
    this.randomNumberGenerator = randomNumberGenerator
  }

  public async login(req: Request, res: Response) {
    const user = await this.accountRepository.login(req.body.email, req.body.password)
    if (!user) {
      return res.status(404).send()
    } else {
      return res.status(200).send(this.createToken(user))
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const user: User = {
        email: req.body.email,
        firstName: req.body.firstName,
        id: this.randomNumberGenerator.generateGuid(),
        lastName: req.body.lastName,
        password: req.body.password
      }

      const updatedUser = await this.accountRepository.register(user)

      return res.status(201).send(this.createToken(updatedUser))
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  private createToken(user: User) {
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
}
