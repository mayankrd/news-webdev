/**
 * Created by mayank on 12/10/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require('../user/user.schema.server')(mongoose);
    var CommentSchema = mongoose.Schema({
            commentText: String,
            createdByUser: UserSchema,
        },
        {collection: 'article.comments'});

    return CommentSchema;
};