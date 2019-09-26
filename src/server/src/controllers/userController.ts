import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import IUserRepository from '../data/iUserRepository'
import SERVICE_IDENTIFIERS from '../dependency/serviceIdentifiers'
import User from '../model/user'

@injectable()
export default class UserController {

  private userRepository: IUserRepository

  constructor(@inject(SERVICE_IDENTIFIERS.IUserRepository) repo: IUserRepository) {
    this.userRepository = repo
  }

  public async get(req: Request, res: Response) {
    const user = await this.userRepository.getByUsername(req.params.username)
    return res.status(user ? 200 : 404).send(user)
  }

  public async insert(req: Request, res: Response) {
    const user: User = {
      email: req.body.email,
      firstName: req.body.firstName,
      id: Math.floor(Math.random() * 100000) + 1,
      lastName: req.body.lastName,
      password: req.body.password,
      phone: req.body.phone,
      username: req.body.username,
    }

    const updatedUser = await this.userRepository.insert(user)

    return res.status(201).send(updatedUser)
  }

  public async update(req: Request, res: Response) {
    const username = req.params.username
    const user = await this.userRepository.getByUsername(username)
    if (!user) {
      return res.status(404).send()
    }

    user.username = req.body.username || user.username
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.phone = req.body.phone || user.phone

    const updatedUser = await this.userRepository.update(user)

    return res.status(202).send()
  }

  public async delete(req: Request, res: Response) {
    const username = req.params.username
    const user = await this.userRepository.getByUsername(username)
    if (!user) {
      return res.status(404).send()
    }

    await this.userRepository.delete(username)

    return res.status(204).send()
  }
}
