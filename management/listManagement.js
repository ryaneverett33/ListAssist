var UserControl = require('../database/UserControl');
var ListControl = require('../database/ListControl');
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
//Assumes userindb has already been checked
//callback(listObj|null)
exports.getLists = function(userid, callback) {
    if(callback == null) {
        console.error("ListManagement::getLists() callback function is null");
        return;
    }
    ListControl.getListsByUserId(userid, function(lists) {
        if (lists == null || lists[0] == null) {
            console.log(lists);
            console.error("ListManagement::getLists() unable to get Lists");
            callback(null);
            return;
        }
        else {
            callback(lists);
            return;
        }
    });
    /*UserControl.isUserIdInDb(userid, function(yes) {
        if (yes) {
            ListControl.getListsByUserId(userid)
        }
        else {
            callback(null);
        }
    });*/
}
//callback(null|listid)
exports.createList = function(listname, userid, callback) {
    ListControl.createList(listname, userid, callback);
};
exports.editList = function(list_id, newname, callback) {
    ListControl.editList(list_id, newname, callback);
};
exports.addItem = function(name, list_id, picture, callback) {
    ListControl.addItem(name, list_id, picture, callback);
}
//callback(true|false)
exports.editItem = function(id, column, new_value, callback) {
    ListControl.editItem(id, column, new_value, callback);
}

exports.deleteList = function(id, callback) {
    ListControl.deleteList(id, callback);
}

exports.deleteItem = function(id, callback) {
    ListControl.deleteItem(id, callback);
}
//callback(true|false)
exports.purchaseItem = function(itemid, name, callback) {
    ListControl.isPurchased(itemid, function(purchased) {
        if (purchased) {
            console.log("already purchased");
            callback(false);
            return;
        }
        else {
            ListControl.purchaseItem(itemid, name, function(success) {
                if (success) {
                    console.log("successfully purchased!");
                    callback(true);
                    return;
                }
                else {
                    console.log("failed to purchase item");
                    callback(false);
                    return;
                }
            });
        }
    });
}
exports.listExists = function(listid, callback) {
    ListControl.listExists(listid, callback);
}
//Assumes userindb has already been checked
//callback(listObj|null)
exports.getList = function(listid, callback) {
    if(callback == null) {
        console.error("ListManagement::getLists() callback function is null");
        return;
    }
    try {
        ListControl.getList(listid, function(list) {
            console.log("get list: " + list + JSON.stringify(list));
            if (list == null || list == undefined || list[0] == null) {
                console.error("ListManagement::getLists() unable to get Lists");
                callback(null);
                return;
            }
            else {
                callback(list);
                return;
            }
        });
    }
    catch(err) {
        console.error("couldn't get list: " + err);
        callback(null);
    }
}
exports.isPurchased = ListControl.isPurchased;