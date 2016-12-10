/**
 * Created by mayank on 12/9/16.
 */
module.exports = function(app, mongoose) {

    var model = require("./models/models.server")(app, mongoose);

    require("./services/user.service.server.js")(app, model);

};