//Gets the full body of an HTTP request, calls the callback with the fixed body
exports.resolveBody = function(req, callback) {
    //A weird case to support Postman and regular browsers
    if (this.isBodyFilled(req)) {
        if (callback != null) {
            console.log(req.body);
            callback(req.body);
            return;
        }
        return;
    }
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log("resolved, calling callback");
        if (callback != null) {
            callback(body);
            return;
        }
        return;
    });
}
//Needed for resolvedBody, checks if the HTTP Request body has already been filled or if it's just an empty object
exports.isBodyFilled = function(req) {
    var obj = req.body;
    // https://stackoverflow.com/a/32108184/2220534
    return !(Object.keys(obj).length === 0 && obj.constructor === Object);
}
//Returns true if expired, false if valid
exports.isTimeStampExpired = function(timestamp) {
    //Modified from https://stackoverflow.com/a/847196/2220534
    var expir_date = new Date(unix_timestamp*1000);
    return new Date() > expir_date;
}
//Returns json if successful, null if else
exports.toJson = function(body) {
    console.log("toJson() of %s", body);
    if (typeof body !== 'string') {
        console.log("POSTY");
        //handle postman AGAIN
        return body;
    }
    var json;
    try {
        json = JSON.parse(body);
        return json;
    }
    catch (e) {
        console.log('helpers.toJson() caught an exception: %s', e);
        return null;
    }
    //shouldn't get here
    return null;
}
//obj.oldkey -> obj.newkey
exports.renameKey = function(obj, oldkey, newkey) {
    if (oldkey !== newkey) {
        Object.defineProperty(obj, newkey, 
            Object.getOwnPropertyDescriptor(obj, oldkey));
        delete obj[oldkey];
    }
}