/**
 * Created by mayank on 12/10/16.
 */

var q = require('q');
var mongoose = require('mongoose');

//load user schema
var ArticleSchema = require("./article.schema.server.js")(mongoose);
var ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = function(app, mongoose) {
    var api = {
        createArticle: createArticle,
        findAllArticles: findAllArticles,
        findArticleById: findArticleById,
        deleteArticleById: deleteArticleById,
        updateArticleById: updateArticleById,
        findArticleByTitle: findArticleByTitle,
        setModel: setModel
        //setUserLoggedIn: setUserLoggedIn
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function findArticleByTitle(title) {
        var deferred = q.defer();
        console.log(title);
        ArticleModel.findOne({ "article.title": title}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        //PersonModel.find({ favouriteFoods: "sushi" }, ...);
        return deferred.promise;
    }

    function createArticle(ipArticle){
        var deferred = q.defer();
        var article = {
            "article": ipArticle.article,
            "comments": ipArticle.comments
        };
        ArticleModel.create(ipArticle, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllArticles(){
        var deferred = q.defer();
        ArticleModel.find(function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findArticleById(artId){
        var deferred = q.defer();
        console.log(artId);
        ArticleModel.findOne({_id: artId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        console.log("article promise");
        console.log(deferred.promise);
        return deferred.promise;
    }

    function updateArticleById(id, article) {
        var deferred = q.defer();
        ArticleModel.update({'_id': id},{
            article: article.article,
            comments: article.comments
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

    function deleteArticleById(artId){
        var deferred = q.defer();
        ArticleModel.remove({_id: artId}, function(err, doc){
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