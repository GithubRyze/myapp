'use strict';
var Temperature = require('../controller/temperatureHeartRateRecord');
var express = require('express');
var router = express.Router();

router.post('/addTemperatureHeartRateRecord',Temperature.addTemperatureHeartRateRecord);
router.post('/deleteTemperatureHeartRateRecord',Temperature.deleteTemperatureHeartRateRecord);
router.get('/getTemperatureHeartRateRecord',Temperature.getTemperatureHeartRateRecord);
router.get('/getUserTemperatureHeartRateRecords',Temperature.queryTemperatureHeartRateRecordByUserId);

module.exports = router;