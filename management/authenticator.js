var google = require('googleapis');
var googleAuth = google.auth.OAuth2;;
var googleClient;
var GOOGLE_CLIENT_ID = '573599211231-qce8oli9m4kjlb9fl0ah35evg4e8seju.apps.googleusercontent.com';
//Google Auth Library https://github.com/google/google-api-nodejs-client/#authorizing-and-authenticating
var initialized = false;

//Based on https://developers.google.com/identity/sign-in/web/backend-auth


//To avoid multiple inits: App.js calls init() first
exports.init = function() {
    if (initialized) {
        return;
    }
    //CLIENT ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URL
    googleClient = new googleAuth(GOOGLE_CLIENT_ID, 
        '', 
        '');
    initialized = true;
}
/*
AuthObj {
    tokenId: Oath token, provider: [google], name, email
}
Callback:
A null object is returned if failed to authenticate
UserPayload {
    name, email, profile pic, id, expiration timestamp (unix), provider
}
*/
exports.authenticate = function(AuthObj, callback) {
    if (AuthObj == null) {
        callback(null);
    }
    switch (AuthObj.provider) {
        case 'google':
            googleClient.verifyIdToken({ idToken: AuthObj.tokenId, audience: GOOGLE_CLIENT_ID} , function(e, login) {
                if (login) {
                    var payload = login.getPayload();
                    //check if values match
                    if (AuthObj.name !== payload.name) {
                        console.log("authenticator::'names don't match'");
                        callback(null);
                        return;
                    }
                    else if (AuthObj.email !== payload.email) {
                        console.log("authenticator::'emails don't match'");
                        callback(null);
                        return;
                    }
                    else {
                        callback({
                            name : payload.name,
                            email : payload.email,
                            profile_pic : payload.picture,
                            id : payload.sub,
                            timestamp : payload.exp,
                            provider : 'google'
                        });
                        return;
                    }
                }
                else {
                    console.log("authenticator::'failed to verify token'");
                    callback(null);
                    return;
                }
            });
            return;
        default:
            callback(null);
            return;
    }
}