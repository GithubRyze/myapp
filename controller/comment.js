'use strict';
const Comment = require('../model/comment');
module.exports = {
    addComment : function(req,res,next){
        const comment = {
            doctorId : req.body.doctorId,
            toUserId : req.body.toUserId,
            bloodRecordId : req.body.bloodRecordId,
            temperatureHeartRateRecordId : req.body.temperatureHeartRateRecordId,
            commentText : req.body.commentText
        }
        Comment.create({where : comment}).then(comment => {
            if(comment){
                const result = {
                    message:'success',
                    comment : comment
                }
                res.status(200).end(JSON.stringify(result));
            }else{
                res.status(200).end('failed');
            }
        });
    },

    deleteComment : function(req,res,next){
		const id = req.body.id;
		Comment.destroy({where : {id : id}}).then(msg => {
			console.log('user:'+JSON.stringify(user));
			if(msg)
				res.status(500).end('delete comment success');
			else
				res.status(500).end('comment not exist');
		},fail => {
			res.status(500).end('delete comment failed');
		});
	},

    getComment: function (req, res, next) {
		const id = req.query.id;
		Comment.findById(id).then(comment => {
			if (comment) {
				res.status(200).end(JSON.stringify({
					message: 'success',
					comment: comment
				}));
				return;
			}
			res.status(200).end('can not find comment');
		}, fail => {
			res.status(200).end('can not find comment');
		}).catch(err => {
			res.status(500).end('server internal error');
		});
    },
    
    updateComment : function(req,res,next){
        const id = req.body.id;
        const text = req.body.commentText;
        Comment.update({where : {id : id,commentText : text}}).then(() => {

        });
    }

}