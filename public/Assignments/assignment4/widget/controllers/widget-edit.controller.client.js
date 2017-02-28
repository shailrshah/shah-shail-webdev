(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.del=del;
        vm.update=update;

        function init() {
            console.log("In edit widget controller");
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            console.log(vm.widget);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'widget/templates/editors/widget-'+type+'-edit.view.client.html';
        }

        function del(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets");
        }

        function update(){
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets");
        }
    }
})();