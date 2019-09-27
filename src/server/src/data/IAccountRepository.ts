import User from '../model/user'

export default interface IAccountRepository {
    login(email: string, password: string): Promise<User> 
    register(user: User): Promise<User>
}
