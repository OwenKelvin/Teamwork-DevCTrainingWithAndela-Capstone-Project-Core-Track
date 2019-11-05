const express = require('express');
const articlesService = require('../services/articles.service');
const userService = require('../services/users.service');
const authService = require('../services/auth.service');
const router = express.Router();

// Auth Routes
router.post('/auth/signin', authService.login);
router.post( '/auth/create-user', userService.createNewEmpolyee );

// Articles Routes
router.post('/articles', articlesService.store);

module.exports = router;
