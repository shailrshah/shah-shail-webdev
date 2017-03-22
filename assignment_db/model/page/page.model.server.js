module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema;
    var PageModel;

    var api = {
        createPageForWebsite: createPageForWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model) { 
        model = _model;
        PageSchema = require('./page.schema.server')(_model);
        PageModel = mongoose.model("pageModel", PageSchema);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({"_website": websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function createPageForWebsite(websiteId, page) {
        var promise = PageModel.create(page);
        return promise
            .then(function(newPage){
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function(website){
                        website.pages.push(newPage);
                        newPage._website = website._id;
                        website.save();
                        newPage.save();
                        return newPage;
                    },function (error) {
                        console.log(error);
                    });
            }, function (error) {
                console.log(error);
            });
    }

    function updatePage(pageId, page) {
        return PageModel.update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return PageModel.findByIdAndRemove(pageId, function (err, page) {
            page.remove();
        });
    }
}