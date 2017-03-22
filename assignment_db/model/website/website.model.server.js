module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var WebsiteSchema;
    var WebsiteModel;

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        WebsiteSchema = require('./website.schema.server')(_model);
        WebsiteModel = mongoose.model("websiteModel", WebsiteSchema);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({"_user": userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function createWebsiteForUser(userId, website) {
        var promise = WebsiteModel.create(website);
        return promise
            .then(function(newWebsite){
                    return model
                        .userModel
                        .findUserById(userId)
                        .then(function(user){
                            user.websites.push(newWebsite);
                            newWebsite._user = user._id;
                            user.save();
                            newWebsite.save();
                            return newWebsite;
                        },function (error) {
                                console.log(error);
                        });
                }, function (error) {
                    console.log(error);
                });
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update({_id: websiteId}, {$set: website});
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.findByIdAndRemove(websiteId, function (err, website) {
            website.remove();
        });
    }
}