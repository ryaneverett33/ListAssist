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
AuthObj:
tokenId: Oath token
provider: [google]
name
email
Callback:
bool - autenticated or not ||||CURRENTLY|||
Soon:
UserPayload {
    name, email, profile pic, id, expiration timestamp (unix), provider
}
*/
exports.authenticate = function(AuthObj, callback) {
    if (AuthObj == null) {
        callback(false);
    }
    switch (AuthObj.provider) {
        case 'google':
            googleClient.verifyIdToken({ idToken: AuthObj.tokenId, audience: GOOGLE_CLIENT_ID} , function(e, login) {
                if (login) {
                    console.log(login.getPayload());
                    callback(true)
                }
                else {
                    callback(false);
                }
            });
            return;
        default:
            callback(null);
            return;
    }
}