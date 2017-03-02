(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http){
        var api = {
            "createHeaderWidget": createHeaderWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "createWidget": createWidget,
            "findWidgetById": findWidgetById,
            "createImageWidget": createImageWidget,
            "createYoutubeWidget": createYoutubeWidget,
            "createHtmlWidget": createHtmlWidget
        };
        return api;

        function createWidget(pageId, type){
            return $http.post("/api/page/"+pageId+"/widget",{"widgetType":type});
        }
        function createHeaderWidget(pageId) {
            return $http.post("/api/page/"+pageId+"/widget_header");
        }

        function createHtmlWidget(pageId) {
            return $http.post("/api/page/"+pageId+"/widget_html");
        }
        function createImageWidget(pageId) {
            return $http.post("/api/page/"+pageId+"/widget_image");
        }

        function createYoutubeWidget(pageId) {
            return $http.post("/api/page/"+pageId+"/widget_youtube");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }
    }
})();