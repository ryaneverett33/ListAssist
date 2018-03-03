var getEntry = require('./getEntry');
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
                conn.query("SELECT * FROM Lists WHERE name=? AND user_id=?;", [name, userid], function(queryerr2, results, fields) {
                    
                    if (queryerr2) {
                        console.error("ListControl::createUser() failed to query twice pool: %s", queryerr2);
                        callback(null);
                        return;
                    }
                    else { 
                        //console.log(results.id);
                        callback(Number(results[0].id));
                        return;
                    }
                });
            }
        });
    });
}