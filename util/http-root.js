var root = null;
module.exports.getRoot = function() {
    return root;
}
module.exports.setRoot = function(newRoot) {
    if (root == null) root = newRoot;
}