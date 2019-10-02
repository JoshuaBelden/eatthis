import User from '../models/user'

export default interface IAccountRepository {
    login(email: string, password: string): Promise<User> 
    register(user: User): Promise<User>
}
