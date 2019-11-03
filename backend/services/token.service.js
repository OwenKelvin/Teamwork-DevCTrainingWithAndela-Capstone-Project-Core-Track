let jwt = require('jwt-simple');
const { passportSecret } = require('../config/env.config');

let checkAdminToken = (req, res, next) => {
  if (req.url === '/auth/signin') {
    return next();
  }
  let token =
    req.headers['x-access-token'] || req.headers['authorization'] || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      //   let decoded = jwt.decode(token, passportSecret);
      //   if (decoded && decoded.exp < Date.now()) {
      //     return res.end('token expired', 401);
      //   }
      next();
      return;
    } catch (err) {
      res.status(401);
      return res.send('Authorization token provided is invalid');
    }
  } else {
    return res.status(401).send({
      success: false,
      message: 'User is not authenticated'
    });
  }
};

module.exports = {
  checkAdminToken: checkAdminToken
};
