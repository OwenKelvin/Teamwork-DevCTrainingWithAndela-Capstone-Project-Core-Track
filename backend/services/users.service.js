const authService = require('./auth.service');
const bcrypt = require('bcrypt');
const pg = require('pg');
const saltRounds = 12;
const { pool } = require('../config/db');
const pool2 = pool;
const userService = {
  createNewEmpolyee(req, res, done) {
    userService.createUser(req.body).then(data => {
      return res.status(201).send(data.rows[0]);
    });
  },
  async deleteUser(data) {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        client.release();
        if (err) {
          return console.error('connection error', err);
        } else {
          const { email } = data;
          const text = 'DELETE FROM users WHERE "email"=$1';
          client
            .query(text, [email])
            .then(response => {
              resolve(response);
            })
            .catch(e => reject(e))
            .finally(() => {
              // pool.end();
            });
        }
      });
    });
  },
  async createUser(data) {
    return new Promise((resolve, reject) => {
      pool2.connect((err, client, done) => {
        if (err) {
          return console.error('connection error', err);
        } else {
          if (data) {
            let {
              firstName,
              lastName,
              email,
              password,
              address,
              jobRole,
              gender,
              department
            } = data;
            const text =
              'INSERT INTO users( "firstName", "lastName", "email", "password", "address", "jobRole", "gender", "department") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

            bcrypt.hash(password, saltRounds).then(hash => {
              const values = [
                firstName,
                lastName,
                email,
                hash,
                address,
                jobRole,
                gender,
                department
              ];

              client
                .query(text, values)
                .then(res => {
                  resolve(res);
                })
                .catch(e => {
                  reject(e);
                })
                .finally(() => {
                  // pool2.end();
                });
            });
          }
        }
      });
    });
  }
};
module.exports = userService;
