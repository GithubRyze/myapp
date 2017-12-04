'use strict';
const BloodRecord = require('../model/bloodRecord');
module.exports = {
    addBloodRecord: function (req, res, next) {
        const bloodRecord = {
            userId: req.body.userId,
            commentId: req.body.commentId,
            dbp: req.body.dbp,
            sbp: req.body.sbp,
            hb: req.body.hb,
            healthValue: req.body.healthValue
        }
        BloodRecord.create({ where: bloodRecord }).then(bloodRecord => {
            if (bloodRecord) {
                const result = {
                    message: 'success',
                    bloodRecord: bloodRecord
                }
                res.status(200).end(JSON.stringify(result));
            } else {
                res.status(200).end('failed');
            }
        });
    },

    deleteBloodRecord: function (req, res, next) {
        const id = req.body.id;
        BloodRecord.destroy({ where: { id: id } }).then(msg => {
            //console.log('user:'+JSON.stringify(user));
            if (msg)
                res.status(500).end('delete BloodRecord success');
            else
                res.status(500).end('BloodRecord not exist');
        }, fail => {
            res.status(500).end('delete BloodRecord failed');
        });
    },

    getBloodRecord: function (req, res, next) {
        const id = req.query.id;
        User.findById(id).then(bloodRecord => {
            if (bloodRecord) {
                res.status(200).end(JSON.stringify({
                    message: 'success',
                    bloodRecord: bloodRecord
                }));
                return;
            }
            res.status(200).end('can not bloodRecord comment');
        }, fail => {
            res.status(200).end('can not bloodRecord comment');
        }).catch(err => {
            res.status(500).end('server internal error');
        });
    },

    updateBloodRecord: function (req, res, next) {
        const id = req.body.id;
        const text = req.body.commentText;
        BloodRecord.update({ where: { id: id, commentText: text } }).then(() => {

        });
    },

    queryUserRecords: function (req, res, next) {

    },

    getBloodRecords: function (req, res, next) {
        const admin = req.headers.token.admin;
        if (!admin) {
            res.status(200).end('You are not admin');
            return;
        }
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 1;
        BloodRecord.findAndCountAll({
            where: {

            },
            limit: req.query.limit || 10,
            offset: req.query.offset || 1
        }).then(result => {
            const rd = {
                total: result.count,
                rows: result.rows
            };
            res.status(200).end(JSON.stringify(rd));
        }
            );

    }

}
