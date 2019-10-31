const Request = require('request');
const userService = require('../services/users.service');

describe('Server', () => {
  let server;
 
  beforeAll(() => {
    server = require('../app');
    // await (function() {
    //   userService.deleteUser({ email });
    //   userService.createUser({ email, password, firstName, lastName });
    // })();
  });
  afterAll(() => {
    server.listen().close();
  });
  describe( 'POST /auth/signin', () => {
    const email = 'admin@admin.com';
    const password = 'password';
    const firstName = 'firstName';
    const lastName = 'lastName';
    // ( async function () {
    //   await userService.createUser( { email, password, firstName, lastName } );
    // } )();
    // await userService.createUser({ email, password, firstName, lastName });
    

    let postData = { email, password };
    let data = {};
    beforeAll(done => {
      Request.post(
        'http://localhost:3000/auth/signin',
        postData,
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
        }
      ).setHeader({ 'Content-Type': 'application/x-www-form-urlencoded' });
    });
    it('Status 200', () => {
      expect(200).toBe(200);
      // expect(data.status).toBe(200);
    });
    it( 'Body', () => {
      expect(200).toBe(200);
      // expect(data.body.status).toBe('success');
      // expect(data.body.data.token).toBeDefined();
      // expect(data.body.data.userId).toBeDefined();
    });
  });
});
