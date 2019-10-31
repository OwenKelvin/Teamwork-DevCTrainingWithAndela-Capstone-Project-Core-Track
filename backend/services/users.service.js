const bcrypt = require('bcrypt');
const pg = require('pg');
const saltRounds = 12;
const pool = require('../config/db');
const pool2 = require('../config/db');
const userService = {
  deleteUser(data) {
    pool.connect( ( err, client, done ) => {
      client.release();
      if (err) {
        return console.error('connexion error', err);
      } else {
        const { email } = data;
        const text = 'DELETE FROM users WHERE "email"=$1';
        client
          .query(text, [email])
          .then(res => {
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
          })
          .catch( e => console.error( e.stack ) ).finally( () => {
            pool.end();
          });
      }
    });
  },
  createUser(data) {
    pool2.connect(  ( err, client, done ) => {
      if (err) {
        return console.error('connexion error', err);
      } else {
        const { firstName, lastName, email, password, address } = data;

        const text =
          'INSERT INTO users( "firstName", "lastName", "email", "password", "address") VALUES($1, $2, $3, $4, $5) RETURNING *';

        bcrypt.hash(password, saltRounds).then(hash => {
          const values = [firstName, lastName, email, hash, address];
          client
            .query(text, values)
            .then(res => {
              done();
              // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
            })
            .catch( e => console.error( e.stack ) ).finally( () => {
              pool2.end();
            });
        });
      }
    });
  }
};
module.exports = userService;
