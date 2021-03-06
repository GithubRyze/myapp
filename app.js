var express = require('express');
var config = require('config-lite');
var router = require('./routes/index.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var winston = require('winston');
var expressWinston = require('express-winston');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
//添加MIME类型
var MIME_TYPE = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'xml': 'text/xml'
};
var apis = ['/bp_api/user/all', '/bp_api/user/delete', '/bp_api/user/user', '/bp_api/user/update'];
const app = express();
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true); //可以带cookies
    res.header('X-Powered-By', '3.2.1');
    //res.header('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    //res.header('Pragma', 'no-cache'); // HTTP 1.0.
    //res.header('Expires', '0');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        if (apis.indexOf(req.url) !== -1 || req.url.indexOf('bp_api/comment') !== -1 || req.url.indexOf('bp_api/bloodrecord') !== -1 ||
            req.url.indexOf('/bp_api/temperatureHeartRate') !== -1) {
            var token = req.headers.token;
            console.log('decode::' + req.url);
            if (token === undefined) {
                let result = {
                    code: 104,
                    message: 'not token,please login'
                };
                res.status(200).end(JSON.stringify(result));
                return;
            }
            var decode = jwt.decode(token, 'secret');
            console.log('\n \n \r decode::' + JSON.stringify(decode));
            req.headers.token = decode;
            next();
        } else {
            next();
        }
    }

});
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie
}));
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));
router(app);
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use((err, req, res, next) => {
    res.status(404).send('未找到当前路由');
});
console.log('config.port:' + config.port);
app.listen(config.port);
