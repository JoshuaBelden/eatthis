import User from '../models/user'

export default interface IAccountRepository {
    loginAsync(email: string, password: string): Promise<User> 
    registerAsync(user: User): Promise<User>
}
