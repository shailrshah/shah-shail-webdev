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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(widget){
                    vm.widget = angular.copy(widget.data);
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            console.log(type);
            return 'widget/templates/editors/widget-'+type+'-edit.view.client.html';
        }

        function del(){
            console.log("deleting")
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(widgets){
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets");
                });
        }

        function update(){
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(function(widgets){
                    $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets");
                })
        }
    }
})();