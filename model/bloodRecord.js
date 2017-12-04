'use strict';
const db = require('../db/sequelizeDb.js');
const Sequelize = require('sequelize');

const BooldRecord = db.define('bloodRecord',{

    id : {type : Sequelize.INTEGER,allowNull : false,autoIncrement : true,primaryKey : true},
    userId : {type : Sequelize.INTEGER,allowNull : false},
    commentId : {type : Sequelize.INTEGER,allowNull:true,defaultValue : null},
    dbp : {type : Sequelize.INTEGER,allowNull:false},
    sbp : {type : Sequelize.INTEGER, allowNull:false},
    hb:{type:Sequelize.INTEGER,allowNull: false},
    healthValue : {type:Sequelize.INTEGER,allowNull: false},   
},{

});
BooldRecord.sync();
module.exports = BooldRecord;