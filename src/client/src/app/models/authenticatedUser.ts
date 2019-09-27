export class AuthenticatedUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string = ''
  ) {}
}
