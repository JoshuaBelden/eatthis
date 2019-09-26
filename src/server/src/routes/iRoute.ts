import * as express from 'express'

export default interface IRoute {
  configure(app: express.Application): void
}