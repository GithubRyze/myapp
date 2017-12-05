'use strict';
const db = require('../db/sequelizeDb.js');
const Sequelize = require('sequelize');

const TemperatureHeartRateRecord = db.define('temperatureHeartRateRecord', {

    id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    commentId: { type: Sequelize.INTEGER, allowNull: true, defaultValue: null },
    temperature: { type: Sequelize.INTEGER, allowNull: false },
    hb: { type: Sequelize.INTEGER, allowNull: false }
}, {timestamps: false});
TemperatureHeartRateRecord.sync();
module.exports = TemperatureHeartRateRecord;