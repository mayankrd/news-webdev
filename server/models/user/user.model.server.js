/**
 * Created by mayank on 12/10/16.
 */
/**
 * Created by rohitbegani on 11/7/16.
 */
var q = require('q');
var mongoose = require('mongoose');

//load user schema
var UserSchema = require("./user.schema.server.js")(mongoose);
var UserModel = mongoose.model("User", UserSchema);

module.exports = function(app, mongoose) {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        setModel: setModel
        //setUserLoggedIn: setUserLoggedIn
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(ipUser){
        var deferred = q.defer();
        var user = {
            "username": ipUser.username,
            "password": ipUser.password,
            "name": ipUser.name
        };
        UserModel.create(ipUser, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        console.log(userId);
        UserModel.findOne({_id: userId}, function(err, doc){
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

    function findUserByCredentials (credentials){
        console.log("Checking in the model");
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUserById(id, user) {
        var deferred = q.defer();
        UserModel.update({'_id': id},{
            username: user.username,
            password: user.password,
            name: user.name,
            email: user.email
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

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, doc){
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