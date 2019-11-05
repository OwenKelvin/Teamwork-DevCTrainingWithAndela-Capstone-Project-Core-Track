const { apiBase } = require('../config/env.config');
const axios = require( 'axios' );
const userService = require('../services/users.service');
let adminEmail = 'admin' + Date.now() + '@gmail.com';
let password = 'password';
let adminToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM2NiwiaWF0IjoxNTcyNzkyMDQ5NzU5fQ.JNYZU2NeJIRTruT3Ln9AydtsvLmBTJHDczKmg7Ed4nc';

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
        console.log("An error occured");
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
        .post(`${apiBase}/auth/signin`, postData)
        .then(response => {
          data.body = response.data;
          data.status = response.status;
          done();
        })
        .catch(err => {
          console.log('An error occured');
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
    const postData = {
      email: adminEmail,
      password
    };
    beforeEach(done => {
      axios
        .post(`${apiBase}/auth/signin`, postData)
        .then(response => {
          adminToken = response.data.data.token;
          done();
        })
        .catch(err => {
          // console.log(err);
        });
    });
    describe('By an admin user', () => {
      let config = {
        headers: { Authorization: 'bearer ' + adminToken }
      };
      let data = {};
      let employeeEmail = 'employee' + Date.now() + '@gmail.com';
      beforeAll(done => {
        const postData = {
          email: employeeEmail,
          firstName: 'firstName',
          lastName: 'lastName',
          jobRole: 'admin',
          password: password
        };
        axios
          .post(`${apiBase}/auth/create-user`, postData, config)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
            done();
          })
          .catch(e => {
            console.log('An Error Occured Logging in user');
          });
      });
      it('should have a status code of 201', () => {
        expect(data.status).toBe(201);
      });
      it('should return object with id', () => {
        expect(data.body.id).toBeDefined();
      });
      it('should return object with correct email', () => {
        expect(data.body.email).toBe(employeeEmail);
      });
    });
    describe( 'By a non admin user', () => {
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
          .post(`${apiBase}/auth/create-user`, postData)
          .then(response => {
            data.body = response.data;
            data.status = response.status;
            done();
          })
          .catch(e => {
            data.status = e.response.status;
            done();
          });
      });
      it('should have a status code of 401', () => {
        expect(data.status).toBe(401);
      });
    });
  });

  // describe('POST /auth/create-user', () => {
  //   let data = {};
  //   let employeeEmail = 'employee' + Date.now() + '@gmail.com';
  //   beforeEach(done => {
  //     const postData = {
  //       email: employeeEmail,
  //       firstName: 'firstName',
  //       lastName: 'lastName',
  //       jobRole: 'admin',
  //       password: password
  //     };
  //     axios
  //       .post('http://localhost:3000/auth/create-user', postData)
  //       .then(response => {
  //         data.body = response.data;
  //         data.status = response.status;
  //         done();
  //       })
  //       .catch(e => {
  //       });
  //   });
  //   it('should have a status code of 201', () => {
  //     expect(data.status).toBe(201);
  //   });
  //   it('should return object with id', () => {
  //     expect(data.body.id).toBeDefined();
  //   });
  //   it('should return object with correct email', () => {
  //     expect(data.body.email).toBe(employeeEmail);
  //   });
  // });
});
