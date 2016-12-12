/**
 * Created by mayank on 12/10/16.
 */

var q = require('q');
var mongoose = require('mongoose');

//load user schema
var CommentSchema = require("./comment.schema.server.js")(mongoose);
var CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = function(app, mongoose) {
    var api = {
        createComment: createComment,
        findAllComment: findAllComment,
        findCommentById: findCommentById,
        deleteCommentById: deleteCommentById,
        updateCommentById: updateCommentById,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createComment(ipComment){
        var deferred = q.defer();
        var comment = {
            "commentText": ipComment.commentText,
            "createdByUser": ipComment.createdByUser
        };
        CommentModel.create(ipComment, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllComment(){
        var deferred = q.defer();
        CommentModel.find(function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findCommentById(commentId){
        var deferred = q.defer();
        console.log(userId);
        CommentModel.findOne({_id: commentId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        console.log("user promise");
        console.log(deferred.promise);
        return deferred.promise;
    }

    function updateCommentById(id, user) {
        var deferred = q.defer();
        CommentModel.update({'_id': id},{
            commentText: ipComment.commentText,
            createdByUser: ipComment.createdByUser
        }, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteCommentById(commentId){
        var deferred = q.defer();
        CommentModel.remove({_id: commentId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};