'use strict';
var Comment = require('../controller/comment');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/getComment',Comment.selectComment);
router.post('/updateComment',Comment.updateComment);
router.post('/deleteComment',Comment.deleteComment);
router.post('/addComment',Comment.addComment);

module.exports = router;