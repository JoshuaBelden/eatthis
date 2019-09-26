import User from '../model/user'

export default interface IUserRepository {
    getByUsername(username: string): Promise<User> 
    insert(user: User): Promise<User>
    update(user: User): Promise<User>
    delete(username: string): Promise<void>
}
