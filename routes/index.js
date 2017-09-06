'use strict';
var user = require('./user.js');
var booldrecord = require('./bloodrecord.js');

module.exports = router =>{

	router.use('/user',user);
	router.use('/bloodrecord',booldrecord);
	
}
