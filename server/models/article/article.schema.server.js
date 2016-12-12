/**
 * Created by mayank on 12/10/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var CommentSchema = require('../comment/comment.schema.server.js')(mongoose);
    var UserSchema = mongoose.Schema({
            article: {author: String, description: String, publishedAt: Date, title: String, url: String, urlToImage: String},
            comments: [CommentSchema]
        },
        {collection: 'article'});

    return UserSchema;
};