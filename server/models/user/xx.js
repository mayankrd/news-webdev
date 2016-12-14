/**
 * Created by mayank on 12/13/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var XX = mongoose.Schema({
            name: String
        },
        {collection: 'xx'});

    return XX;
};