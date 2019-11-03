const express = require('express');
const passport = require('passport');
const userService = require('../services/users.service');

var router = express.Router();
var authService = require('../services/auth.service');

router.post('/signin', authService.login);
router.post('/create-user', userService.createNewEmpolyee);

module.exports = router;
