/**
 * Created by mayank on 12/10/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
            name: String,
            username: String,
            password: String
        },
        {collection: 'user'});

    return UserSchema;
};