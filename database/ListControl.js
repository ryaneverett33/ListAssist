var getEntry = require('./getEntry');
var setEntry = require('./setEntry');
var addEntry = require('./addEntry');
var deleteEntry = require('./deleteEntry');
var helpers = require('../routes/helpers');
var pool = require('./connections');
var helpers = require('../routes/helpers');
//callback(listObj|null)
/*
listObj : [
    {
        "info" : {
            "id" : int,
            "name" : string,
            "user_id" : string,
            "count" : int
        },
        "items" : [
            {
                "id" : int,
                "name" : string,
                "picture_url" : string|null,
                "buyer" : string|null,
                "purchased" : bool,
                "list_id" : int
            }
        ]
    }
]
*/
exports.getListsByUserId = function(userid, callback) {
    getEntry.getLists(userid, function(lists) {
        if (lists.length == 0) {
            callback({});
            return;
        }
        /*if (lists[0] == null) {
            callback(null);
            return;
        }*/
        //var listcount = 0;
        var listcount = Number(lists.length);
        var iterate = true;
        //don't know how many items are in the list
        for (var i = 0; i < listcount; i++) {
            if (lists[i] === null || lists[i] === undefined) continue;
            helpers.renameKey(lists[i], "row", "info");
        }
        callback(lists);
    });
}
//callback(null|listid)
exports.createList = function(name, userid, callback) {
    if (callback === null) {
        console.error("ListControl::createUser() no callback");
        return;
    }
    pool.connect(function(err, conn) {
        if (err) {
            console.error("ListControl::createUser() failed to get pool connection: %d", err);
            callback(null);
            return;
        }
        conn.query('INSERT INTO Lists Values(0,?,?);', [name, userid], function(queryerr) {
            if (queryerr) {
                console.error("ListControl::createUser() failed to query pool: %s", queryerr);
                callback(null);
                return;
            }
            else {
                conn.query("SELECT LAST_INSERT_ID() FROM Lists WHERE name=? AND user_id=?;", [name, userid], function(queryerr2, results, fields) {
                    
                    if (queryerr2) {
                        console.error("ListControl::createUser() failed to query twice pool: %s", queryerr2);
                        callback(null);
                        return;
                    }
                    else {
                        if (results == null || results[0] == null) {
                            callback(null);
                            return;
                        }
                        helpers.renameKey(results[0], "LAST_INSERT_ID()", "id");
                        //console.log(results);
                        //console.log(JSON.stringify(results[0]));
                        //console.log(results[LAST_INSERT_ID()]);
                        //console.log(results.id);
                        callback(results[0].id);
                        return;
                    }
                });
            }
        });
    });
}
exports.editList = function(list_id, newname, callback) {
    console.log("testy");
    console.log("list: ", list_id);
    console.log("name: ", newname);
    console.log("callback ", callback);
    if (callback === null) {
        console.log("HELLO");
        console.error("ListControl::editList() no callback");
        return;
    }
    setEntry.setList(list_id, "name", newname, function(success) {
        callback(success);
    });
}
//callback(bool)
exports.addItem = function(name, list_id, picture, callback) {
    if (callback === null) {
        console.error("ListControl::addItem() no callback");
        return;
    }
    addEntry.createItem(name, picture, null, null, list_id, null, callback);
}

exports.editItem = function(id, column, new_value, callback) {
    if (callback === null) {
        console.error("ListControl::editItem() no callback");
        return;
    }
    setEntry.setItem(id, column, new_value, callback);
} 

exports.deleteList = function(id, callback) {
    if (callback == null) {
        console.error("ListControl::deleteList() no callback");
        return;
    }
    deleteEntry.deleteList(id, callback);
}

exports.deleteItem = function(id, callback) {
    if (callback == null) {
        console.error("ListControl::deleteItem() no callback");
        return;
    }
    deleteEntry.deleteItem(id, callback);
} 

//callback(bool|null)
exports.isPurchased = function(id, callback) {
    getEntry.getItem(id, function(exists) {
        if (exists[0] == null || exists[0] == undefined) {
            callback(null);
            return;
        }
        else {
            //console.log(exists);
            //console.log("exists.purchased %d, == %d === %d == 1", exists[0].purchased, exists.purchased == true, exists.purchased === true, exists.purchased == 1);
            callback(exists[0].purchased == true);
            return;
        }
    });
}
//callback(bool|null)
exports.purchaseItem = function(id, name, callback) {
    this.isPurchased(id, function(purchased) {
        if (purchased == null) {
            callback(null);
            return;
        }
        if (purchased) {
            callback(false);
            return;
        }
        else {
            setEntry.setItem(id, "buyer", name, function(setbuyer) {
                if (!setbuyer) {
                    console.error("Failed to set buyer");
                    callback(false);
                    return;
                }
                else {
                    setEntry.setItem(id, "purchased", 1, function(setpurchased) {
                        if (!setpurchased) {
                            console.error("Failed to set buyer");
                            callback(false);
                            return;
                        }
                        else {
                            callback(true);
                            return;
                        }
                    });
                }
            });
        }
    });
}

//callback(bool)
exports.listExists = function(id, callback) {
    getEntry.getItems(id, function(list) {
        callback(list !== false);
    });
}
exports.getList = function(listid, callback) {
    getEntry.getList(listid, function(lists) {
        if (lists.length == 0) {
            callback({});
            return;
        }
        if (lists[0] === null || lists[0] === undefined) {
            console.error("getList null");
            callback({});
            return;
        }
        helpers.renameKey(lists[0], "row", "info");
        callback(lists);
    });
}