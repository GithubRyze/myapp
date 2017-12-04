'use strict';
const TemperatureHeartRateRecord = require('../model/bloodRecord');
module.exports = {
    addTemperatureHeartRateRecord: function (req, res, next) {
        const temperatureHeartRateRecord = {
            userId: req.body.userId,
            commentId: req.body.commentId,
            temperature: req.body.temperature,
            hb: req.body.hb
        }
        TemperatureHeartRateRecord.create({ where: temperatureHeartRateRecord }).then(temperatureHeartRateRecord => {
            if (temperatureHeartRateRecord) {
                const result = {
                    message: 'success',
                    temperatureHeartRateRecord: bloodRecord
                }
                res.status(200).end(JSON.stringify(result));
            } else {
                res.status(200).end('failed');
            }
        });
    },

    deleteTemperatureHeartRateRecord: function (req, res, next) {
        const id = req.body.id;
        TemperatureHeartRateRecord.destroy({ where: { id: id } }).then(msg => {
            //console.log('user:'+JSON.stringify(user));
            if (msg)
                res.status(500).end('delete TemperatureHeartRateRecord success');
            else
                res.status(500).end('TemperatureHeartRateRecord not exist');
        }, fail => {
            res.status(500).end('delete TemperatureHeartRateRecord failed');
        });
    },

    getTemperatureHeartRateRecord: function (req, res, next) {
        const id = req.query.id;
        TemperatureHeartRateRecord.findById(id).then(temperatureHeartRateRecord => {
            if (temperatureHeartRateRecord) {
                res.status(200).end(JSON.stringify({
                    message: 'success',
                    temperatureHeartRateRecord: temperatureHeartRateRecord
                }));
                return;
            }
            res.status(200).end('can not temperatureHeartRateRecord comment');
        }, fail => {
            res.status(200).end('can not temperatureHeartRateRecord comment');
        }).catch(err => {
            res.status(500).end('server internal error');
        });
    },

    updateTemperatureHeartRateRecord: function (req, res, next) {
        const id = req.body.id;
        const text = req.body.commentText;
        TemperatureHeartRateRecord.update({ where: { id: id, commentText: text } }).then(() => {

        });
    },

    addBulkTemperatureHeartRateRecord: function (req, res, next) {
        var beans = req.body.temperatureHeartRate;
        TemperatureHeartRateRecord.bulkCreate(beans).then(() => {
            return TemperatureHeartRateRecord.findAll();
        }).then(temperatureHeartRateRecords => {
            res.status(200).end(JSON.stringify(temperatureHeartRateRecords));
        });
    },

    queryTemperatureHeartRateRecordByUserId: function (req, res, next) {

        var order = req.query.order || 'ASC';
        var limit = req.query.limit || 20;
        var offset = req.query.offset || 1;
        var userId = req.headers.token.id;

        TemperatureHeartRateRecord.findAndCountAll({
            where: {
                userId: userId,
            },
            limit: limit,
            offset: offset,
            order: order
        }).then(result => {
            const rd = {
                message: 'success',
                total: result.count,
                rows: result.rows
            };
            res.status(200).end(JSON.stringify(rd));
        });

    }
}