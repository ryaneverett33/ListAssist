var getEntry = require('./getEntry');
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
            helpers.renameKey(lists[i], "row", "info");
        }
        callback(lists);
    });
}