'use strict';
const db = require('../db/sequelizeDb.js');
const Sequelize = require('sequelize');

const User = db.define('user', {

    id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    email: {
        type: Sequelize.STRING, allowNull: true, validate: {
            isEmail: true
        }
    },
    sex: { type: Sequelize.INTEGER, allowNull: true },
    height: { type: Sequelize.INTEGER, allowNull: true },
    weight: { type: Sequelize.INTEGER, allowNull: true },
    age: { type: Sequelize.INTEGER, allowNull: true, validate: { min: 1, max: 150 } },
    admin: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
    avatar: { type: Sequelize.STRING, allowNull: true }
    //phoneNumber : {type:Sequelize.STRING,allowNull : true}
    //createdAt : {type : Sequelize.DATE,allowNull : false,defaultValue : Sequelize.NOW},
    //updatedAt : {type : Sequelize.DATE,allowNull : false,defaultValue : Sequelize.NOW},
}, {});
User.sync();
module.exports = User;
