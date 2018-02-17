/*
Placeholder class and functions
Used in:
userRouteHandler
*/
var User = require('./User');
var pool = require('./connections');
var getter = require('./getEntry');
//UserObj: {name, imageUrl, email, providerid}
//callback (boolean)
//if user exists in db
//MIGHT NOT BE NECESSARY
exports.isUserInDb = function(userObj, callback) {
    //callback(true);
    throw 'Not Implemented';
}
//callback (boolean)
//if successfully put in db
exports.putUser = function(userObj, callback) {
    if (userObj.name == null || userObj.imageUrl == null || userObj.email == null || userObj.providerid == null) {
        console.error("UserControl::putUser() has invalid arguments: %s", userObj);
    }
    pool.connect(function(err, conn) {
        if (err) {
            console.error("UserControl::putUser() failed to get pool connection");
            if (callback != null) {
                callback(false);
                return;
            }
        }
        //TODO check if User already exists
        else {
            //set the user in the database
            //id, username (null), name, email, image
            conn.query('INSERT into Users Values(?,NULL,?,?,?);', [userObj.providerid, userObj.name, userObj.email, userObj.imageUrl], function(queryerr) {
                if (queryerr) {
                    console.error("UserControl::putUser() failed to insert user. Error: %s", queryerr);
                    if (callback != null) {
                        callback(false);
                        return;
                    }
                }
                else {
                    if (callback != null) {
                        callback(true);
                        return;
                    }
                }
            });
        }
    });
}
//callback(User|null)
//User Object is ./User.js
exports.getUser = function(id, callback) {
    //callback(new User.user("test", "email", 0, "image", 0));
    getter.getUser(id, function(row){
        //getUser returns the entire row so that's we have to parse that (which is stupid)
        if (row == null || row === false) {
            console.error('UserControl::getUser got nothing from getEntry::getUser()');
            if (callback != null) {
                callback(null);
                return;
            }
        }
        else {
            //parse
            if (callback != null) {
                callback(new User.user(row[0].name, row[0].email, row[0].id, row[0].image, row[0].id));
                return;
            }
        }
    });
}
exports.getUserBySearch = function(providerid, name, email, callback) {

}