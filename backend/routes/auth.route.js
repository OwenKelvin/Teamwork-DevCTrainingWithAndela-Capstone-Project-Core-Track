const express = require('express');
const passport = require( 'passport' );
const userService = require('../services/users.service')

// var app = express();
// app.use( passport.initialize() );
// app.use(passport.session());
var router = express.Router();
var authService = require('../services/auth.service');

// const requireSignIn = passport.authenticate('local', { session: false });

/* GET users listing. */
// router.post('/signin', requireSignIn, Authentication.signin);
router.post('/signin', authService.login);

module.exports = router;
