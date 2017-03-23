module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var WidgetSchema;
    var WidgetModel;

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    }
    return api;

    function setModel(_model) {
        model = _model;
        WidgetSchema = require('./widget.schema.server')(_model);
        WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    }

    function findAllWidgetsForPage(pageId){
        return WidgetModel.find({_page:{'$in' : pageId}});
    }

    function findWidgetById(widgetId){
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget){
        console.log(widgetId);
        console.log(widget);
        return WidgetModel.update({_id: widgetId},{$set: widget});
    }

    function deleteWidget(widgetId){
        return WidgetModel.findByIdAndRemove(widgetId, function(error, widget){
            widget.remove();
        });
    }

    // Create widget
    // find the page
    // push widget on page
    // save both widget and page
    function createWidget(pageId, newWidget){
        return WidgetModel
            .create(newWidget)
            .then(function (widget) {
                return model
                    .pageModel
                    .findPageById(pageId)
                    .then(function (page) {
                        widget._page = page._id;
                        page.widgets.push(widget._id);
                        widget.save();
                        page.save();
                        return widget;
                    }, function (err) {
                        console.log(error);
                        return err;
                    });
            }, function (error) {
                console.log("Error occured.");
                return error;
            });
    }

    function reorderWidget(pageId, start, end) {
        return model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                var widgetToInsert = page.widgets[start];
                page.widgets.splice(start,1);
                page.widgets.splice(end, 0, widgetToInsert);
                page.save();
                return 200;
            }, function (err) {
                return err;
            });
    }
}