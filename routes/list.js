var express = require('express');
var router = express.Router();

/* get the page for creating a new list */
router.get('/new', function(req, res, next) {
  res.render('newlist', {});
});

/* create a new list */
router.post('/new', function(req, res, next) {
  //
  
});

/* display a list */
router.get('/:id', function(req, res, next) {
  // todo: get the list from the database

  // todo:
  res.render('list', { title: 'List' });
});


module.exports = router;
