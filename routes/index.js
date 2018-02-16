var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  
  //serve the login page
  //res.render('login');
  res.render('itemsExample');
});

module.exports = router;
