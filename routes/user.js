var User =require('../controller/user.js')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register',User.register);
router.post('/login',User.login);
router.get('/all',User.getAllUser);
router.get('/user',User.getUser);

module.exports = router;
