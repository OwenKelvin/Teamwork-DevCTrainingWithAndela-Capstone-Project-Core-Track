const axios = require('axios');
const userService = require('../services/users.service');
let adminEmail = 'admin' + Date.now() + '@gmail.com';
let password = 'password';

describe('Server', () => {
  beforeAll(done => {
    const adminUserData = {
      email: adminEmail,
      firstName: 'firstName',
      lastName: 'lastName',
      jobRole: 'admin',
      password: password
    };
    password = 'password';
    userService
      .createUser(adminUserData)
      .then(val => {
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  describe('POST /auth/signin', () => {
    let data = {};
    const postData = {
      email: adminEmail,
      password
    };

    beforeEach(done => {
      axios
        .post('http://localhost:3000/auth/signin', postData)
        .then(response => {
          data.body = response.data;
          data.status = response.status;
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it('should have a status code of 200', () => {
      expect(data.status).toBe(200);
    });
    it("should have a body with status of 'success'", () => {
      expect(data.body.status).toBe('success');
    });
    it('should have a body with token', () => {
      expect(data.body.data.token).toBeDefined();
    });
    it('should have a body with a userId', () => {
      expect(data.body.data.userId).toBeDefined();
    });
  });

  describe('POST /auth/create-user', () => {
    let data = {};
    let employeeEmail = 'employee' + Date.now() + '@gmail.com';
    beforeEach(done => {
      const postData = {
        email: employeeEmail,
        firstName: 'firstName',
        lastName: 'lastName',
        jobRole: 'admin',
        password: password
      };
      axios
        .post('http://localhost:3000/auth/create-user', postData)
        .then(response => {
          data.body = response.data;
          data.status = response.status;
          done();
        })
        .catch(e => {
          console.log(e);
        });
    });
    it('should have a status code of 201', () => {
      expect(data.status).toBe(201);
    });
    it('should return object with id', () => {
      expect(data.body.id).toBeDefined();
    } );
    it('should return object with correct email', () => {
      expect(data.body.email).toBe(employeeEmail);
    });
  });
});
