(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function init() {
            console.log("In edit widget controller");
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            console.log(widget);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'widget/templates/widget-'+type+'-edit.view.client.html';
        }
    }
})();