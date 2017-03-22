module.exports = function(){
    console.log("In models.server.js");
    var mongoose = require('mongoose');
    console.log(mongoose.connection.readyState);
    var userModel = require("./user/user.model.server")();

    var model = {
        userModel: userModel
    };

    userModel.setModel(model);
    console.log(mongoose.connection.readyState);
    mongoose.connection.on('connected', function(){
        console.log("Connected.");
    });
    return model;
}