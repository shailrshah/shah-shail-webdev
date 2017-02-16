(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController(PageService, $location, $routeParams){
        var vm=this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;

        vm.createPage=createPage;

        function init() {
            vm.pages=PageService.findPageByWebsite(vm.websiteId)
        }
        init();

        function createPage() {
            console.log(vm.page);
            PageService.createPage(vm.websiteId, angular.copy(vm.page));
            vm.pages=PageService.findPageByWebsite(vm.websiteId);
        }
    }
})();