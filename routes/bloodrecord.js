var BloodRecord = require('../controller/bloodrecord');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getRecord',BloodRecord.getRecord);
router.post('/addRecord',BloodRecord.addRecord);
router.delete('/deleteRecord',BloodRecord.deleteRecord);
router.post('/updateRecord',BloodRecord.updateRecord);
router.get('/allRecord',BloodRecord.getAllRecord);


module.exports = router;