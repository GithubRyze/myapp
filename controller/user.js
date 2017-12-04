'use strict';
const User = require('../model/user');
const JWT = require('jwt-simple');
module.exports = {
	login: function (req, res, next) {
		var name = req.body.name;
		var password = req.body.password;
		User.findOne({ where: { name: name, password: password } }).then(user => {
			if (user === null) {
				const result = {
					message: 'username or password is wrong',
					user: null
				}
				res.status(200).end(JSON.stringify(result));
				return;
			}
			let isAdmin = user.admin;
			var payload = {
				id: user.id,
				name: user.name,
				admin: isAdmin
			};
			var secret = 'secret';
			var token = JWT.encode(payload, secret);
			res.header("token", token);
			var result = {
				message: 'login success',
				user: user
			};
			res.status(200).end(JSON.stringify(result));
		}, fail => {
			const result = {
				message: 'server internal error',
			};
			res.status(500).end(JSON.stringify(result));
		});
	},

	register: function (req, res, next) {
		const user = {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			sex: req.body.sex,
			height: req.body.height,
			weight: req.body.weight,
			age: req.body.age,
			admin: req.body.admin,
			avatar: req.body.avatar,
			//phoneNumber : req.body.phone
		}
		User.findOrCreate({ where: user }).catch(err => {
			console.log('err:' + err);
			res.status(200).end('Username is exist');
			return;
		}).spread((user, created) => {
			//console.log('user:'+JSON.stringify(user));
			//console.log('created:'+JSON.stringify(created));
			if (created) {
				const result = {
					message: 'Register success',
					user: user
				}
				res.status(200).end(JSON.stringify(result));
				return;
			}
			res.status(200).end('User register failed');
		}).catch(err => {
			res.status(200).end('User register failed');
		});
	},

	getAllUser: function (req, res, next) {
		User.findAll().then(users => {
			res.status(200).end(JSON.stringify({
				message: 'success',
				users: users
			}));
		})
	},

	getUser: function (req, res, next) {
		const userID = req.query.userId;
		User.findById(userID).then(user => {
			if (user) {
				res.status(200).end(JSON.stringify({
					message: 'success',
					user: user
				}));
				return;
			}
			res.status(200).end('can not find user');
		}, fail => {
			res.status(200).end('can not find user');
		}).catch(err => {
			res.status(500).end('server internal error');
		});
	},

	deleteUser : function(req,res,next){
		const userID = req.body.userId;
		User.destroy({where : {id : userID}}).then(msg => {
			console.log('user:'+JSON.stringify(user));
			if(msg)
				res.status(500).end('delete user success');
			else
				res.status(500).end('UserId not exist');
		},fail => {
			res.status(500).end('delete user failed');
		});
	},

	updateUser: function(req,res,next){
		const user = {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
			sex: req.body.sex,
			height: req.body.height,
			weight: req.body.weight,
			age: req.body.age,
			admin: req.body.admin,
			avatar: req.body.avatar,
			//phoneNumber : req.body.phone
		}
		User.update({where : user}).then(() => {

		})
	}
};
