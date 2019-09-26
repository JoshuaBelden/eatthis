import { injectable } from "inversify"
import IUserRepository from '../../src/data/iUserRepository'
import User from '../../src/model/user'

@injectable()
export default class UserRepositoryMock implements IUserRepository {

    private datastore: Array<User> = []

    public getByUsername(username: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const result = this.datastore.find(user => user.username === username)
            resolve(result)
        })
    }

    public insert(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.datastore.push(user)
            resolve(user)
        })
    }

    public update(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const userIndex = this.datastore.findIndex(item => item.username === user.username)

            if (userIndex === -1) {
                reject("User not found.")
                return
            }

            const existingUser = this.datastore[userIndex]
            existingUser.username = user.username || existingUser.username
            existingUser.firstName = user.firstName || existingUser.firstName
            existingUser.lastName = user.lastName || existingUser.lastName
            existingUser.email = user.email || existingUser.email
            existingUser.password = user.password || existingUser.password
            existingUser.phone = user.phone || existingUser.phone

            this.datastore[userIndex] = user
            resolve(user)
        })
    }

    public delete(username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const userIndex = this.datastore.findIndex(item => item.username === username)

            if (userIndex === -1) {
                reject("User not found.")
                return
            }

            this.datastore = this.datastore.filter(item => item.username === username)

            resolve()
        })
    }
}