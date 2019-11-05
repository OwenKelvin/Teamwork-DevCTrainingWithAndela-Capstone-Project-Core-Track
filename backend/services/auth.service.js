// const client = require('../config/db');
const { pool } = require('../config/db');
const jwt = require('jwt-simple');
const bcrpt = require('bcrypt');
const { passportSecret } = require('../config/env.config');

const authService = {
  tokenForUSer(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, passportSecret);
  },
  login ( req, res, done ) {
    
    const { email, password } = req.body;
    const text = `SELECT * FROM users where email=$1`;
    pool.connect(function(err, client, done) {
      if (err) {
        return console.error('connection error', err);
      }
      client
        .query(text, [email])
        .then( response => {
        
          if (response.rows.length > 0) {
            const user = response.rows[0];
            const token = authService.tokenForUSer(user);
            const userId = user.id;
            bcrpt.compare(password, user.password).then(validPassword => {
              if (validPassword) {
                res
                  .status(200)
                  .send({ status: 'success', data: { token, userId } });
                done();
              } else {
                res.status(401).send({
                  status: 'fail',
                  message: 'invalid username or password'
                });
                done();
              }
            });
          } else {
            res.status(401).send({ status: 'fail' });
            done();
          }
          const user = response.rows[0];
        })
        .catch(err => {
          done();
        })
        .finally(() => {
          // pool.end();
        });
    });
  }
};
module.exports = authService;
