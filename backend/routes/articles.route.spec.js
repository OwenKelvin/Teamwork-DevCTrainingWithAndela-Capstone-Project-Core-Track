const { apiBase } = require('../config/env.config');
const axios = require( 'axios' );
let userEmail = 'employee' + Date.now() + '@gmail.com';
const userService = require('./../services/users.service');
const password = 'password';
let token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NiwiaWF0IjoxNTcyNzkyMDQ5NzU5fQ.JNYZU2NeJIRTruT3Ln9AydtsvLmBTJHDczKmg7Ed4nc';
describe('POST /articles', () => {
  beforeEach(done => {
    const userData = {
      email: userEmail,
      firstName: 'firstName',
      lastName: 'lastName',
      jobRole: 'admin',
      password: password
    };
    userService
      .createUser()
      .then(() => {
        axios
          .post(`${apiBase}/auth/signin`, userData)
          .then(response => {
            token = response.data.data.token;
            done();
          })
          .catch(e => {
            console.log(' => An error occured logging in user');
          });
      })
        .catch( e => {
           console.log(' => An error occured Creating a user');
      });
  });
  describe('with all parameters', () => {
    let data = { data: {} };
    const config = {
      headers: { Authorization: 'bearer ' + token }
    };
    beforeEach(done => {
      const articleData = {
        title: 'Some Article title',
        article: 'some article body'
      };
      axios
        .post(`${apiBase}/articles`, articleData, config)
        .then(response => {
          data.statusCode = response.status;
          data.data.status = response.data.status;
          data.data.id = response.data.data.articleId;
          data.data.message = response.data.data.message;
          done();
        })
        .catch(e => {
          console.log('An error occured creating article');
          done();
        });
    });
    it('should return status 201', () => {
      expect(data.statusCode).toBe(201);
    });
    it('should create an article', () => {
      expect(data.data.id).toBeDefined();
    });
    it('should return a body with a message', () => {
      expect(data.data.message).toBeDefined();
    });
    it('should return a body with a status "success"', () => {
      expect(data.data.status).toBeDefined('success');
    });
  });
});
