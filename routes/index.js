var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    res.render('login');
  }
  catch (err) {
    res.status(500).send(JSON.stringify({error : err}));
  }
});

module.exports = router;
