import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import IAccountRepository from '../data/IAccountRepository'
import SERVICE_IDENTIFIERS from '../dependency/serviceIdentifiers'
import { default as config } from '../environments/config'
import User from '../model/user'

@injectable()
export default class AccountController {

  private accountRepository: IAccountRepository

  constructor(@inject(SERVICE_IDENTIFIERS.IAccountRepository) repo: IAccountRepository) {
    this.accountRepository = repo
  }

  public async login(req: Request, res: Response) {
    const user = await this.accountRepository.login(req.body.email, req.body.password)
    if (!user) {
      return res.status(404)
    } else {
      return res.status(200).send(this.createToken(user))
    }
  }

  public async register(req: Request, res: Response) {
    const user: User = {
      email: req.body.email,
      firstName: req.body.firstName,
      id: Math.floor(Math.random() * 100000) + 1,
      lastName: req.body.lastName,
      password: req.body.password
    }

    const updatedUser = await this.accountRepository.register(user)

    return res.status(201).send(this.createToken(updatedUser))
  }

  private createToken(user: User) {
    const expiresIn = 60 * 60;
    const secret = config.security.secret;
    const dataStoredInToken = {
      id: user.id,
    };
    return {
      expiresIn,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}
