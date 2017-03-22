module.exports = function(app){
    console.log("In app.js");
    var model = require("./model/models.server")();
    require("./services/user.service.server.js")(app, model.userModel);
    console.log("Got it");
};