var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Teamwork - The Backend',
    author: 'Owen Kelvin',
    description: 'The backend for DevCTrainingWithAndela Capstone Project'
  });
});

module.exports = router;
