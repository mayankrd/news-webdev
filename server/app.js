/**
 * Created by mayank on 12/9/16.
 */
module.exports = function(app, mongoose) {

    var model = require("./models/models.server")(app, mongoose);

    require("./services/user.service.server.js")(app, model);
    require("./services/article.service.server")(app, model);
    require("./services/comment.service.server")(app, model);
    require("./services/search.service.server")(app, model);
};