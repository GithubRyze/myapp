'use strict';
const db = require('../db/sequelizeDb.js');
const Sequelize = require('sequelize');

const Comment = db.define('comment', {

    id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    doctorId: { type: Sequelize.INTEGER, allowNull: false },
    toUserId: { type: Sequelize.INTEGER, allowNull: false },
    bloodRecordId: { type: Sequelize.INTEGER, allowNull: false },
    temperatureHeartRateRecordId: { type: Sequelize.INTEGER, allowNull: false },
    commentText: { type: Sequelize.STRING, allowNull: false }
}, {});
Comment.sync();
module.exports = Comment;