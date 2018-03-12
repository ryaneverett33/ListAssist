var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(500).send("ERROR");
  //res.send('respond with a resource');
});

module.exports = router;
