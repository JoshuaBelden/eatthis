export default class AuthToken {
    public expiresIn: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public token: string;

    public constructor(expiresIn: number, firstName: string, lastName: string, email: string, token: string) {
        this.expiresIn = expiresIn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
    }
}
