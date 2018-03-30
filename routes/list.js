var express = require('express');
var router = express.Router();
var UserManagement = require('../management/userManagement');
var ListManagement = require('../management/listManagement');
var helpers = require('./helpers');
var scrapeAmazonList = require('../util/listscraper');
var scrapeAmazonItem = require('../util/itemscraper');
var httproot = require('../util/http-root');

/* get the page for creating a new list */
/*router.get('/new', function (req, res, next) {
  try {
    res.render('newlist', {});
  }
  catch (err) {
    res.status(500).send(JSON.stringify({error:err}));
  }
});*/

/* create a new list */
/*
token : "user login token",
name : "name of new list"
*/
router.post('/new', function (req, res, next) {
  try {
    helpers.resolveBody(req, function (body) {
      if (body == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Empty Request" }));
        return;
      }
      var json = helpers.toJson(body);
      if (json == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
        return;
      }
      if (json.token == null || json.name == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
        return;
      }
      UserManagement.getUser(json.token, function (User) {
        if (User == null) {
          res.setHeader("content-type", "application/json");
          res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
          return;
        }
        else {
          ListManagement.createList(json.name, User.getId(), function (id) {
            if (id == null) {
              res.setHeader("content-type", "application/json");
              res.status(500).send(JSON.stringify({ error: "Unable to create List" }));
              return;
            }
            else {
              res.setHeader("content-type", "application/json");
              res.status(200).send(JSON.stringify({ id: id }));
              return;
            }
          });
        }
      });
    });
  }
  catch (err) {
    res.status(500).send(JSON.stringify({ error: err }));
  }
});

//Edit the name of the list
/*
token : "user login token",
id : "list id",
name : "new name of the list"
*/
router.post('/edit', function (req, res, next) {
  try {
    helpers.resolveBody(req, function (body) {
      if (body == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Empty Request" }));
        return;
      }
      var json = helpers.toJson(body);
      if (json == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
        return;
      }
      if (json.token == null || json.name == null || json.id == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
        return;
      }
      UserManagement.getUser(json.token, function (User) {
        if (User == null) {
          res.setHeader("content-type", "application/json");
          res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
          return;
        }
        else {
          ListManagement.editList(json.id, json.name, function (success) {
            res.setHeader("content-type", "application/json");
            res.status(success ? 200 : 500).send();
          });
        }
      });
    });
  }
  catch (err) {
    res.status(500).send(JSON.stringify({ error: err }));
  }

});
//Add item to a list
/*
token : user token
name : name of item,
list_id : list to add to,
picture : url of picture,
*/
router.post('/add', function (req, res, next) {
  try {
    helpers.resolveBody(req, function (body) {
      if (body == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Empty Request" }));
        return;
      }
      var json = helpers.toJson(body);
      if (json == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
        return;
      }
      if (json.token == null || json.name == null || json.list_id == null) {
        res.setHeader("content-type", "application/json");
        res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
        return;
      }
      if (json.picture == null) json.picture = 'NULL';
      UserManagement.getUser(json.token, function (User) {
        if (User == null) {
          res.setHeader("content-type", "application/json");
          res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
          return;
        }
        else {
          //this should probably return the item id
          ListManagement.addItem(json.name, json.list_id, json.picture, function (success) {
            res.setHeader("content-type", "application/json");
            res.status(success ? 200 : 500).send();
          });
        }
      });
    });
  }
  catch (err) {
    res.status(500).send(JSON.stringify({ error: err }));
  }

});

/*edits an item in a list
arguments needed:
  token
  id (int, which is the id of item)
  column: name, picture_url, buyer, purchased, or list_id
  new_value (must be the correct type, all ints except name and picture_url)
*/
router.post('/item/edit', function (req, res, next) {
  helpers.resolveBody(req, function (body) {
    if (body == null) {
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Empty Request" }));
      return;
    }
    var json = helpers.toJson(body);
    if (json == null) {
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
      return;
    }
  });
});

/* Get the lists of a user */
/*
token : "user login token" || userid : "user id"
*/
router.post('/get', function (req, res, next) {
  helpers.resolveBody(req, function (body) {
    if (body == null) {
      console.log("body null");
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Empty Request" }));
      return;
    }
    var json = helpers.toJson(body);
    if (json == null) {
      console.log("json null");
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
      return;
    }
    if (json.token == null && json.userid == null) {
      console.log("invalid arguments");
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
      return;
    }
    if (json.token != null && json.userid != null) {
      console.log("can't have both");
      res.setHeader("content-type", "application/json");
      res.status(400).send(JSON.stringify({ error: "ya can't have both" }));
      return;
    }
    if (json.token != null) {
      console.log("getting from token");
      //get User id from UserManagement (user is logged in)
      UserManagement.getUser(json.token, function (User) {
        console.log("user null");
        if (User == null) {
          console.log("user null");
          res.setHeader("content-type", "application/json");
          res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
          return;
        }
        else {
          console.log("get list from user");
          ListManagement.getLists(User.getId(), function (lists) {
            if (lists == null) {
              console.log("lists null from user");
              res.setHeader("content-type", "application/json");
              res.status(404).send(JSON.stringify({ error: "Unable to retrive lists" }));
              return;
            }
            else {
              console.log("lists g");
              res.setHeader("content-type", "application/json");
              res.status(200).send(JSON.stringify(lists));
              return;
            }
          });
        }
      });
    }
    else {
      console.log("get from id");
      //get Lists from given id
      ListManagement.getLists(json.userid, function (lists) {
        console.log("got lists from id");
        if (lists == null) {
          console.log("lists null");
          res.setHeader("content-type", "application/json");
          res.status(404).send(JSON.stringify({ error: "Unable to retrive lists" }));
          return;
        }
        else {
          console.log("lists g");
          res.setHeader("content-type", "application/json");
          res.status(200).send(JSON.stringify(lists));
          return;
        }
      });
    }
  });
});

  /* Get the lists of a user */
  /*
  token : "user login token" || userid : "user id"
  */
  router.post('/all', function (req, res, next) {
    try {
      helpers.resolveBody(req, function (body) {
        if (body == null) {
          console.log("body null");
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Empty Request" }));
          return;
        }
        var json = helpers.toJson(body);
        if (json == null) {
          console.log("json null");
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
          return;
        }
        if (json.token == null && json.userid == null) {
          console.log("invalid arguments");
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
          return;
        }
        if (json.token != null && json.userid != null) {
          console.log("can't have both");
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "ya can't have both" }));
          return;
        }
        if (json.token != null) {
          console.log("getting from token");
          //get User id from UserManagement (user is logged in)
          UserManagement.getUser(json.token, function (User) {
            console.log("user null");
            if (User == null) {
              console.log("user null");
              res.setHeader("content-type", "application/json");
              res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
              return;
            }
            else {
              console.log("get list from user");
              ListManagement.getLists(User.getId(), function (lists) {
                if (lists == null) {
                  console.log("lists null from user");
                  res.setHeader("content-type", "application/json");
                  res.status(404).send(JSON.stringify({ error: "Unable to retrive lists" }));
                  return;
                }
                else {
                  console.log("lists g");
                  res.setHeader("content-type", "application/json");
                  res.status(200).send(JSON.stringify(lists));
                  return;
                }
              });
            }
          });
        }
        else {
          console.log("get from id");
          //get Lists from given id
          ListManagement.getLists(json.userid, function (lists) {
            console.log("got lists from id");
            if (lists == null) {
              console.log("lists null");
              res.setHeader("content-type", "application/json");
              res.status(404).send(JSON.stringify({ error: "Unable to retrive lists" }));
              return;
            }
            else {
              console.log("lists g");
              res.setHeader("content-type", "application/json");
              res.status(200).send(JSON.stringify(lists));
              return;
            }
          });
        }
      });
    }
    catch (err) {
      console.log("/list/all encountered an error: " + err);
      res.status(500).send(JSON.stringify({ error: err }));
      return;
    }
  });

  /* display a list */
  /*router.get('/items.html', function (req, res, next) {
    try {
      // todo: get the list from the database
      var listId = Number(req.location.split("?")[1]);
      if (listId == NaN || listId == null) {
        res.render('404');
        return;
      }
      else {
        ListManagement.listExists(listId, function (exists) {
          if (exists) {
            /*res.render('itemsPublicExample', {
              id: listId
            });*/
  /*          res.sendFile('/items.html', {root : httproot.getRoot()});
            return;
          }
          else {
            res.status(404);
            res.render('404');
            return;
          }
        })
      }
    }
    catch (err) {
      res.status(500).send(JSON.stringify({ error: err }));
    }
    // todo:
    //res.render('list', { title: 'List' });
    //});
  });*/

  /**
   * Imports an amazon list
   * input: token, listUrl
   */
  router.post('/import', function (req, res, next) {
    try {
      helpers.resolveBody(req, function (body) {
        if (body == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Empty Request" }));
          return;
        }
        var json = helpers.toJson(body);
        if (json == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
          return;
        }
        if (!json.listUrl || json.token == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
          return;
        }
        UserManagement.getUser(json.token, function (User) {
          if (User == null) {
            res.setHeader("content-type", "application/json");
            res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
            return;
          }
          else {
            scrapeAmazonList(json.listUrl).then(list => {
              console.log(list);
              ListManagement.createList(list.listTitle, User.getId(), function (newListId) {
                if (newListId == null) {
                  res.setHeader("content-type", "application/json");
                  res.status(500).send(JSON.stringify({ error: "Unable to create List" }));
                  return;
                }
                else {
                  res.setHeader("content-type", "application/json");
                  res.status(200).send(JSON.stringify({ id: newListId }));
                  list.items.forEach(listItem => {
                    scrapeAmazonItem(listItem.link).then(scrapedItem => {
                      ListManagement.addItem(listItem.itemTitle, newListId, scrapedItem.itemImg, () => {
                        console.log("ListItem added: ", scrapedItem.itemTitle)
                      });
                    }).catch((err) => {
                      console.error("Failed to add parsed item: ", err);
                    })

                  });

                  return;
                }
              });
            }).catch((err) => {
              // Bug 14
              // console.error(err);
              // res.setHeader("content-type", "application/json");
              // res.status(500).send(JSON.stringify({ error: "Failed to scrape list" }));
              ListManagement.createList(" ", User.getId(), function (newListId) {
                if (newListId == null) {
                  res.setHeader("content-type", "application/json");
                  res.status(500).send(JSON.stringify({ error: "Unable to create List" }));
                  return;
                }
                else {
                  res.setHeader("content-type", "application/json");
                  res.status(200).send(JSON.stringify({ id: newListId }));
                }
              });
            })

          }
        });
      });
    }
    catch (err) {
      res.status(500).send(JSON.stringify({ error: err }));
    }
  });

  /**
   * Delete a list
   * input : id, token
   */
  router.post('/delete', function (req, res, next) {
    try {
      helpers.resolveBody(req, function (body) {
        if (body == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Empty Request" }));
          return;
        }
        var json = helpers.toJson(body);
        if (json == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
          return;
        }
        if (json.token == null || json.id == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
          return;
        }
        UserManagement.getUser(json.token, function (User) {
          if (User == null) {
            res.setHeader("content-type", "application/json");
            res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
            return;
          }

          ListManagement.deleteList(json.id, function (success) {
            res.setHeader("content-type", "application/json");
            res.status(success ? 200 : 500).send();
          });

        });
      });
    }
    catch (err) {
      res.status(500).send(JSON.stringify({ error: err }));
    }

  });

  /**
   * Delete a list item
   * input : id, token
   */
  router.post('/item/delete', function (req, res, next) {
    try {
      helpers.resolveBody(req, function (body) {
        if (body == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Empty Request" }));
          return;
        }
        var json = helpers.toJson(body);
        if (json == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
          return;
        }
        if (json.token == null || json.id == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
          return;
        }
        UserManagement.getUser(json.token, function (User) {
          if (User == null) {
            res.setHeader("content-type", "application/json");
            res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
            return;
          }

          ListManagement.deleteItem(json.id, function (success) {
            res.setHeader("content-type", "application/json");
            res.status(success ? 200 : 500).send();
          });

        });
      });
    }
    catch (err) {
      res.status(500).send(JSON.stringify({ error: err }));
    }
  });

  /*
  Purchases an item from the list
  id : item id
  token : optional,
  name : optional
  either name or token supplied
  */
  router.post('/item/purchase', function (req, res, next) {
    try {
      helpers.resolveBody(req, function (body) {
        if (body == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Empty Request" }));
          return;
        }
        var json = helpers.toJson(body);
        if (json == null) {
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Bad JSON" }));
          return;
        }
        if ((json.token == null && json.name == null) || json.id == null) {
          //no name, id, or token
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
          return;
        }
        else if (json.token != null && json.name != null) {
          //suplied both a token and a name
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "ya can't have both" }));
          return;
        }
        else if (json.name === null && json.name === undefined && json.name.toUpperCase() === "NULL") {
          //didn't supply a name
          res.setHeader("content-type", "application/json");
          res.status(400).send(JSON.stringify({ error: "Invalid Arguments" }));
          return;
        }
        if (json.token != null) {
          UserManagement.getUser(json.token, function (user) {
            if (user == null) {
              res.setHeader("content-type", "application/json");
              res.status(401).send(JSON.stringify({ error: "Unable to retrieve user" }));
              return;
            }
            else {
              ListManagement.purchaseItem(json.id, user.getName(), function (success) {
                if (success) {
                  res.setHeader("content-type", "application/json");
                  res.status(200).send();
                  return;
                }
                else {
                  res.setHeader("content-type", "application/json");
                  res.status(500).send(JSON.stringify({ error: "already purchased" }))
                  return;
                }
              });
            }
          });
        }
        else {
          ListManagement.purchaseItem(json.id, json.name, function (success) {
            if (success) {
              res.setHeader("content-type", "application/json");
              res.status(200).send();
              return;
            }
            else {
              res.setHeader("content-type", "application/json");
              res.status(500).send(JSON.stringify({ error: "already purchased" }))
              return;
            }
          })
        }
      });
    }
    catch (err) {
      res.status(500).send(JSON.stringify({ error: err }));
    }
  });


  module.exports = router;
