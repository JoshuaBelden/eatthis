import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import IAccountRepository from '../data/IAccountRepository'
import SERVICE_IDENTIFIERS from '../dependency/serviceIdentifiers'
import User from '../model/user'

@injectable()
export default class AccountController {

  private accountRepository: IAccountRepository

  constructor(@inject(SERVICE_IDENTIFIERS.IAccountRepository) repo: IAccountRepository) {
    this.accountRepository = repo
  }

  public async login(req: Request, res: Response) {
    const user = await this.accountRepository.login(req.body.email, req.body.password)
    return res.status(user ? 200 : 404).send(user)
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

    return res.status(201).send(updatedUser)
  }
}
