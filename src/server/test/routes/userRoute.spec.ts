'use strict'

import * as chai from 'chai'
import chaiHttp = require('chai-http')
import 'mocha'
import Application from '../../src/application'
import SERVICE_IDENTIFIERS from '../../src/dependency/serviceIdentifiers'
import User from '../../src/model/User'
import container from '../dependency/dependency.config'

chai.use(chaiHttp)
const expect = chai.expect

const application = container.get<Application>(SERVICE_IDENTIFIERS.Application)

const user: User = {
  email: 'me@joshuabelden.com',
  firstName: 'Josh',
  id: Math.floor(Math.random() * 100000) + 1,
  lastName: 'Belden',
  password: 'abc123!',
  phone: '541-292-0280',
  username: 'JoshuaBelden'
}

describe('userRoute', () => {

  it('should respond with HTTP 404 status because there is no user', async () => {
    return chai
      .request(application.listener)
      .get(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })

  it('should create a new user and retrieve it back', async () => {
    return chai
      .request(application.listener)
      .post('/users/')
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.username).to.be.equal(user.username)
      })
  })

  it('should return the user created on the step before', async () => {
    return chai
      .request(application.listener)
      .get(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
      })
  })

  it('should update the user Josh', async () => {
    user.username = 'JoshuaBelden'
    user.firstName = 'Joshua'
    user.lastName = 'Belden'
    user.email = 'me@joshuabelden.com'
    user.password = '123abc!'
    user.phone = '541-292-0280'

    return chai
      .request(application.listener)
      .patch(`/users/JoshuaBelden`)
      .send(user)
      .then(res => {
        expect(res.status).to.be.equal(202)
      })
  })

  it('should return the user updated on the step before', async () => {
    return chai
      .request(application.listener)
      .get(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body.username).to.be.equal(user.username)
        expect(res.body.firstName).to.be.equal(user.firstName)
        expect(res.body.lastName).to.be.equal(user.lastName)
        expect(res.body.email).to.be.equal(user.email)
        expect(res.body.password).to.be.equal(user.password)
        expect(res.body.phone).to.be.equal(user.phone)
      })
  })

  it('should return 404 because the user does not exist', async () => {
    return chai
      .request(application.listener)
      .patch(`/users/rando1`)
      .send({
        username: "rando1"
      })
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })

  it('should remove an existent user', async () => {
    return chai
      .request(application.listener)
      .del(`/users/${user.username}`)
      .then(res => {
        expect(res.status).to.be.equal(204)
      })
  })

  it('should return 404 when it is trying to remove an user because the user does not exist', async () => {
    return chai
      .request(application.listener)
      .del(`/users/rando2`)
      .then(res => {
        expect(res.status).to.be.equal(404)
      })
  })
})