/**
 * Created by mayank on 12/10/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    //var ArticleSchema = require('../article/article.schema.server')(mongoose);
    //todo change favorites to be an array of articles
    var UserSchema = mongoose.Schema({
            name: String,
            username: String,
            password: String,
            email: String,
            role: String,
            favorites: [],
            comments: []
        },
        {collection: 'user'});

    return UserSchema;
};