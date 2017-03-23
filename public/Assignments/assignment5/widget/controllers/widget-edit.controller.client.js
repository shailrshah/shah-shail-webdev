(function() {
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
        vm.del = del;
        vm.update = update;

        function init() {
            console.log("edit controller initialized for "+vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    vm.widget = angular.copy(widget.data);
                });
            console.log(vm.widget);
        }

        init();

        function getEditorTemplateUrl() {
            console.log(vm.widget.type);
            return 'widget/templates/editors/widget-' + vm.widget.type + '-edit.view.client.html';
        }

        function del() {
            console.log("deleting")
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (widgets) {
                    $location.url("/user/" + vm.userId + "/websites/" + vm.websiteId + "/pages/" + vm.pageId + "/widgets");
                });
        }

        function update() {
            console.log("updating");
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(function (widgets) {
                    $location.url("/user/" + vm.userId + "/websites/" + vm.websiteId + "/pages/" + vm.pageId + "/widgets");
                })
        }
    }
})();
