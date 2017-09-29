var AWS = require('aws-sdk');
exports.handler = (event, context, callback) => {
    var s3 = new AWS.S3();
    
    // expected pw goes here
    var expected_pw = "MYPW";
    
    var params = {
        Bucket: 'bucketname',  // name of S3 bucket containing file
        Key: 'page.html',      // name of protected page
        Expires: 300           // number of seconds, default is 900
    };
    
    if (!event.pw || (event.pw.toUpperCase() != expected_pw)) {
        callback(null, {"url": ""});
        return;
    }
    
    var url = s3.getSignedUrl('getObject', params, function (err, url) {
        if (err) {
            console.log(err);
        } else {
            console.log('The URL is', url);
        }

        callback(err, {"url": url});
    });
};