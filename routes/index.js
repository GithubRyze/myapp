'use strict';
var user = require('./user.js');
var booldrecord = require('./bloodrecord.js');
var comment = require('./comment.js');
var temperatureHeartRate = require('./temperatureHeartRate.js');
var fs = require('fs');
var path = require('path');

module.exports = router => {

    router.use('/bp_api/user', user);
    router.use('/bp_api/user', user);
    router.use('/bp_api/temperatureHeartRate', temperatureHeartRate);
    router.use('/bp_api/bloodrecord', booldrecord);
    router.use('/bp_api/comment', comment);
    router.get('/index', function (req, res, next) {
        index(req, res, next);
    });
};

var MIME_TYPE = {
    css: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    png: 'image/png',
    svg: 'image/svg+xml',
    swf: 'application/x-shockwave-flash',
    tiff: 'image/tiff',
    txt: 'text/plain',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    xml: 'text/xml'
};
var index = function (req, res, next) {

    fs.readFile('./public/static/index2.html', null, function (err, data) {
        if (err) {
            console.log('err:' + err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 not found');
            return;
        }
        var ext = path.extname('./public/static/index2.html');
        ext = ext ? ext.slice(1) : 'unkown';
        console.log('ext::' + ext);
        var content_type = MIME_TYPE[ext] || 'text/plain';
        res.writeHead(200, { 'Content-Type': content_type });
        res.end(data.toString());
    });
};