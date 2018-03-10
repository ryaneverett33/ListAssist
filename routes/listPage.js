var express = require('express');
var router = express.Router();
var httproot = require('../util/http-root');

/* GET home page. */
/*router.get('/:listId/', function(req, res, next) {
  console.log("Requested list id is " + req.params.listId);
  var listId = req.params.listId;
  //check if list id is valid
  if (listId == 0) {
    //return example
    //serve the items page
    res.render('itemsExample', {listid : listId});   
  }
  else {
    //send error
    res.render('error', {
      message : "Invalid List, doesn't exist",
      error : {
        status : 400,
        stack : ex
      }
    });
  }
  //res.sendFile('/listpage.html', {root : httproot.getRoot()});
});*/
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  
  //serve the login page
  //res.render('login');

  //serve the items page
  try {
    res.render('itemsExample');
  }
  catch(err) {
    res.status(500).send(JSON.stringify({error:err}));
  }
  //<object hidden id="listid" value='<%= listid %>'></object>
});

module.exports = router;
