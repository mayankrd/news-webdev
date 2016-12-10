/**
 * Created by mayank on 12/10/16.
 */
module.exports = function (app, mongoose)
{
    var userModel = require("./user/user.model.server")();

    var model =
    {
        userModel: userModel
    };

    userModel.setModel(model);

    return model;
};