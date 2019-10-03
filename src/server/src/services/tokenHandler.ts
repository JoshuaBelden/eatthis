import { Request } from 'express'
import * as jwt from 'jsonwebtoken';

export default class TokenHandler {

    public tokenExpiration: number
    private secret: string

    public constructor(secret: string, tokenExpiration: number) {
        this.secret = secret
        this.tokenExpiration = tokenExpiration
    }

    public sign(payload: string | object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.tokenExpiration })
    }

    public verify(token: string): string | object {
        return jwt.verify(token, this.secret)
    }

    public readTokenFromHeader(request: Request): string {
        const authorizationHeader = request.headers.authorization
        if (!authorizationHeader) {
            return null
        }

        const token = authorizationHeader.replace('Bearer ', '')
        if (!token) {
            return null
        }

        return token
    }
}