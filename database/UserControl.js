/*
Placeholder class and functions
Used in:
userRouteHandler
*/
var User = require('./User');
//UserObj: {name, imageUrl, email, provider}
//callback (boolean)
//if user exists in db
//MIGHT NOT BE NECESSARY
exports.isUserInDb = function(userObj, callback) {
    callback(true);
}
//callback (boolean)
//if successfully put in db
exports.putUser = function(userObj, callback) {
    callback(1);
}
exports.getUser = function(id, callback) {
    callback(new User.user("test", "email", 0, "image", 0));
}
exports.getUserBySearch = function(providerid, name, email, callback) {

}