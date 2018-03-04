var getEntry = require('./getEntry');
var setEntry = require('./setEntry');
var addEntry = require('./addEntry');
var helpers = require('../routes/helpers');
var pool = require('./connections');
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
            helpers.renameKey(lists[i], "row", "info");
        }
        callback(lists);
    });
}
//callback(null|listid)
exports.createList = function(name, userid, callback) {
    if (callback == null) {
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
                console.error("ListControl::createUser() failed to query pool: %d", err);
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
                        //console.log(results.id);
                        callback(Number(results));
                        return;
                    }
                });
            }
        });
    });
}
exports.editList = function(list_id, newname, callback) {
    if (callback == null) {
        console.error("ListControl::editList() no callback");
        return;
    }
    setEntry.setList(list_id, "name", newname, function(success) {
        callback(success);
    });
}
exports.addItem = function(name, list_id, picture, callback) {
    if (callback == null) {
        console.error("ListControl::addItem() no callback");
        return;
    }
    addEntry.createItem(name, picture, null, null, list_id, null, callback);
}

exports.editItem = function(id, column, new_value, callback) {
    if (callback == null) {
        console.error("ListControl::editItem() no callback");
        return;
    }
    setEntry.setItem(id, column, new_value, callback);
} 