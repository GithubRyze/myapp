'use strict';
var Comment = require('../controller/comment');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/getComment',Comment.getComment);
router.post('/updateComment',Comment.updateComment);
router.post('/deleteComment',Comment.deleteComment);
router.post('/addComment',Comment.addComment);
//router.post('/addTemperatureHeartRateComment',Comment.addTemperatureHeartRateComment);
module.exports = router;