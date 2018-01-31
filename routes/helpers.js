exports.resolveBody = function(req, callback) {
    if (req.body != null) {
        if (callback != null) {
            console.log(req.body);
            callback(req.body);
            return;
        }
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
    });
}