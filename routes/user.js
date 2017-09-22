var User =require('../controller/user.js')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register',User.register);
router.post('/login',User.login);
router.get('/getAllUser',User.getAllUser);
router.get('/getUser',User.getUser);
router.post('/delete',User.deleteUser);
router.post('/update',User.updateUser);
module.exports = router;
