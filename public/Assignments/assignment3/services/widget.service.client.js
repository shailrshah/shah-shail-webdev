(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService(){
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/RVMZxH1TIIQ" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        var api = {
            "findAllWidgets": findAllWidgets,
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "deleteWidget": deleteWidget,
            "updateWidget": updateWidget
        };
        return api;

        function findAllWidgets(pageId){
            var wid = [];
            for(w in widgets){
                widget = widgets[w];
                if(widget.pageId === pageId)
                    wid.push(widget);
            }
            return wid;
        }

        function createWidget(pageId, widget){
            var id = (new Date()).getTime().toString();
            widgets.push({"_id":id, "widgetType":widget, "pageId":pageId});
            return id;
        }

        function findWidgetById(id){
            for (var w in widgets){
                var widget = widgets[w];
                if (widgets._id===id){
                    return widget;
                }
            }
            console.log("Not found.");
            return null;
        }

        function deleteWidget(id) {
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === id) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(id, widget1){
            for(var w in widgets){
                var widget = widgets[w];
                if(widget._id === id){
                    if(widget.widgetType == "HEADER"){
                        widget.size = widget1.size;
                        widget.text = widget1.text;
                        widget.name = widget1.name;

                    } else if(widget.widgetType =="IMAGE"){
                        widget.width = widget1.width;
                        widget.url = widget1.url;

                    } else if (widget.widgetTyep=="HTML"){
                        widget.text = widget1.text;

                    } else if (widget.widgetType=="YOUTUBE"){
                        widget.text = widget1.text;
                        widget.name = widget1.name;
                        widget.url = widget1.url;
                        widget.width=widget1.width;
                    }
                }
            }
        }
    }
})();