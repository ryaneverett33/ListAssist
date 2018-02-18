var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  
  //serve the login page
  //res.render('login');

  //serve the items page
  res.render('itemsExample');
  //res.sendFile('../public/index.html');
  //serve the public items page
  //res.render('itemsPublicExample');
});

module.exports = router;
