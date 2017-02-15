(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce){
        var vm = this;
        console.log("Instantiated");
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;

        vm.getTrustedHtml = getTrustedHtml;
        vm.trustVideo = trustVideo;

        function init(){
            console.log("Initializing");
        }
        init();

        vm.widgets = WidgetService.findAllWidgets(vm.pageId);
        console.log(vm.widgets);

        function trustVideo(url){
            console.log("I trust this youtube video");
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtml(html) {
            console.log("I trust this html code");
            return $sce.trustAsHtml(html);
        }
    }
})();