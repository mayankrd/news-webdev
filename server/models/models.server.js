/**
 * Created by mayank on 12/10/16.
 */
module.exports = function (app, mongoose)
{
    var userModel = require("./user/user.model.server")();
    var articleModel = require("./article/article.model.server")();
    var commentModel = require("./comment/comment.model.server")();

    var model =
    {
        userModel: userModel,
        articleModel: articleModel,
        commentModel: commentModel
    };

    userModel.setModel(model);

    return model;
};