const { apiBase } = require('../config/env.config');
const axios = require('axios');
let userEmail = 'employee' + Date.now() + '@gmail.com';
const userService = require('./../services/users.service');
const password = 'password';
let token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NiwiaWF0IjoxNTcyNzkyMDQ5NzU5fQ.JNYZU2NeJIRTruT3Ln9AydtsvLmBTJHDczKmg7Ed4nc';
describe('POST /articles', () => {
  describe('with all parameters', () => {
    let data = { data: {} };
    beforeEach(done => {
      const config = {
        headers: { Authorization: 'bearer ' + token }
      };
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
        })
        .catch(e => {
          console.log('An error occured creating article');
        })
        .finally(() => {
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
      expect(data.data.status).toBe('success');
    });
  });
});
describe('GET /articles', () => {
  describe('By logged in user', () => {
    let data = { data: {} };
    beforeEach(done => {
      const config = {
        headers: { Authorization: 'bearer ' + token }
      };
      const articleData = {
        title: 'Some Article title',
        article: 'some article body'
      };
      axios
        .get(`${apiBase}/articles`, config)
        .then(response => {
          data.statusCode = response.status;
          data.data.status = response.data.status;
          data.data = response.data.data;
          done();
        })
        .catch(e => {
          console.log('An error occured creating article');
        })
        .finally(() => {
          done();
        });
    });
    it('should return status 200', () => {
      expect(data.statusCode).toBe(200);
    });
    it('should return articles in the correct format', () => {
      expect(data.data).toBeDefined();
    });
  });
});
