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
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
var apis = ['/bp_api/user/all','/bp_api/user/delete','/bp_api/user/user','/bp_api/user/update'];
const app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1');
	res.header("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	res.header("Pragma", "no-cache"); // HTTP 1.0.
	res.header("Expires", "0");
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {	
		if(apis.indexOf(req.url) !== -1 || req.url.indexOf('bp_api/bloodrecord') !== -1){
			var token  = req.headers.token;
			console.log('decode::'+ req.url);
			if(token === undefined){
				res.status(200).end('please login');
				return;
			}
			var decode = jwt.decode(token,'secret');
			console.log('\n \n \r decode::'+ JSON.stringify(decode));
			req.headers.token = decode;
			next();	
		}else {
			next();
		}
	}

});


app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
	  	name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		
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
app.use("/lib",express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use((err, req, res, next) => {
	res.status(404).send('未找到当前路由');
});

console.log("config.port:"+config.port);
app.listen(config.port);

/*var server = http.createServer((req,res) =>{

	console.log('url::'+req.url);
	var filePath;
	if (req.url == '/') {
		filePath = 'public/static/index.html';
	}else{
		filePath = 'public/static/'+url.parse(req.url).pathname;
		//filePath = filePath.slice(1, filePath.lenght);
	}
	console.log('filePath::'+filePath);
	fs.exists(filePath, function(err){
		if (!err) {
			res.writeHead(404,{'Content-Type':'text/plain'});
			res.end(filePath + ' not found');
			return;
		}
		
		fs.readFile(filePath, null, function(err,data){
			if (err) {
				res.writeHead(404,{'Content-Type':'text/plain'});
				res.end('404 not found');
				return;
			}
			var ext = path.extname(filePath);
			ext = ext ? ext.slice(1):'unkown';
			console.log('ext::'+ext);
			var content_type = MIME_TYPE[ext] || 'text/plain';
			res.writeHead(200,{'Content-Type':content_type});
			res.end(data.toString());
		});
	});
}).listen(3000);*/
//console.log("server is staring in port:%d",3000);
