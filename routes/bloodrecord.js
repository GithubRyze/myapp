'use strict';
var BloodRecord = require('../controller/bloodrecord');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getRecord', BloodRecord.getBloodRecord);
router.post('/addRecord', BloodRecord.addBloodRecord);
router.post('/deleteRecord', BloodRecord.deleteBloodRecord);
router.post('/updateRecord', BloodRecord.updateBloodRecord);
//router.get('/allRecord', BloodRecord.getBloodRecords);
router.get('/queryUserRecord', BloodRecord.getBloodRecords);

module.exports = router;

