(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;

        vm.getTrustedHtml=getTrustedHtml;
        vm.getWidgetTemplateUrl=getWidgetTemplateUrl;
        vm.getYouTubeEmbedUrl=getYouTubeEmbedUrl;

        function init(){
            console.log("Here in widget list controller");
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function(widgets){
                    vm.widgets = widgets.data;
                    if(vm.widgets.length == 0)
                        vm.noWidgets="No Widgets have been added yet";
                });
        }
        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();