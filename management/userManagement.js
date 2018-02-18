var UserControl = require('../database/UserControl');
/*
    token : {
        userid : (in database), provider, name, token
    }
*/
var tokens; //list of tokens
var TOKEN_LENGTH = 20;
/* UserObj : {
    name : full_name, email, profile_pic : url, providerid (google id),
    timestamp (expiration time), provider, token
}*/
exports.init = function() {
    tokens = {
        0 : null
     }
}
/*exports.generateToken = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < TOKEN_LENGTH; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
}*/
//adds a user to the tokens list and to the db if need be and returns the token
//if fails to add, return null
//callback(token|null)
exports.addUser = function(UserObj, callback) {
    if(callback == null) {
        console.error("UserManagement::addUser() callback function is null");
        return;
    }
    UserControl.isUserInDb(UserObj, function(exists) {
        var token = UserObj.token;
        if (!exists) {
            //put user in db
            console.log("User doesn't exist in database, adding");
            UserControl.putUser(UserObj, function(success) {
                if (!success) {
                    console.error("UserManagement::addUser() failed to put User in db");
                }
            });
        }
        tokens[token] = {
            userid : UserObj.id,
            provider : 'google',
            name : UserObj.name,
            token : UserObj.token
        };
        callback(UserObj.token);
        return;
    });
}
//checks if the user exists in the database
//
exports.userExists = function(UserObj, callback) {
    if(UserObj == null) {
        console.error("user object is null");
        return;
    }
    if(callback == null) {
        console.error("callback is null");
        return;
    }

}
//gets a user from the database from a given token
//returns a User if successful, null if else 
exports.getUser = function(token, callback) {
    if(callback == null) {
        console.error("callback is null");
        return;
    }
    if (tokens[token] == null) {
        callback(null);
        return;
    }
    UserControl.getUser(tokens[token].userid, function(User) {
        callback(User);
        return;
    });
}
//to get any user's basic info
exports.getUserInfo = function(id, callback) {
    if(id == null) {
        console.error("id is null");
        return;
    }
    if(callback == null) {
        console.error("callback is null");
        return;
    }

}
//remove token from 
exports.logoutUser = function(token) {
    if (tokens[token] == null) {
        return false;
    }
    else {
        tokens[token] = null;
        delete tokens[token];
        return true;
    }
}
//return true if user is already being tracked, otherwise false
function tokenExists(token) {
    return (tokens.token != null);
}