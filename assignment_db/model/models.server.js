module.exports = function(){
    var mongoose = require('mongoose');
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);

    return model;
}