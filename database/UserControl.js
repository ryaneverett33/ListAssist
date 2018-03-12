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
    this.getUser(userObj.id, function(user) {
        callback(!(user == null || user === null));
    });
}
exports.isUserIdInDb = function(userid, callback) {
    this.isUserInDb({ id : userid }, callback);
}
//callback (boolean)
//if successfully put in db
exports.putUser = function(userObj, callback) {
    if (userObj.name == null || userObj.profile_pic == null || userObj.email == null || userObj.id == null) {
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
            conn.query('INSERT into Users Values(?,NULL,?,?,?);', [userObj.id, userObj.name, userObj.email, userObj.profile_pic], function(queryerr) {
                if (queryerr) {
                    console.error("UserControl::putUser() failed to insert user. Error: %s", queryerr);
                    if (callback != null) {
                        callback(false);
                        connection.release();
                        return;
                    }
                }
                else {
                    if (callback != null) {
                        callback(true);
                        connection.release();
                        return;
                    }
                }
                conn.release();
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
        if (row == null || row === false || row[0] == null) {
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
exports.getUserBySearch = function(id, name, email, callback) {

}