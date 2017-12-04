'use strict';
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	'bpdb', 
	'root', 
	 null,
	{
	  host: 'localhost',
	  dialect: 'mysql',
		port : 3306,
	  pool: {
	    max: 5,
	    min: 0,
			idle: 10000,
			acquire: 10000,
			evict: 3000
	  }
	}
);
module.exports = sequelize;