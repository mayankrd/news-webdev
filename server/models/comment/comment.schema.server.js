/**
 * Created by mayank on 12/10/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
            commentText: String,
            createdByUser: String,
        },
        {collection: 'article.comments'});

    return CommentSchema;
};