/*
Placeholder class and functions
Used in:
userRouteHandler
*/
//UserObj: {name, imageUrl, email, provider}
//callback (boolean)
//if user exists in db
exports.isUserInDb = function(userObj, callback) {
    callback(true);
}
//callback (boolean)
//if successfully put in db
exports.putUser = function(userObj, callback) {
    callback(true);
}