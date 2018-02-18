//describes a user in the database
function user(name, email, providerId, image, id) {
    this.name = name;
    //this.listId = listId;
    this.email = email;
    this.image = image;
    this.id = id;
    //this.providerId = providerId;
    //other info
    this.getName = function() {
        return this.name;
    }
    this.getListId = function() {
        return this.id;
    }
    this.getEmail = function() {
        return this.email;
    }
    this.getId = function() {
        return this.id;
    }
    this.getImage = function() {
        return this.image;
    }
}
exports.user = user;