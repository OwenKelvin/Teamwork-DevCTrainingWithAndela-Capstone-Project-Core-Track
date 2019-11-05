const express = require('express');
const articlesService = require('../services/articles.service');

const router = express.Router();

router.post('/', articlesService.store);

module.exports = router;
