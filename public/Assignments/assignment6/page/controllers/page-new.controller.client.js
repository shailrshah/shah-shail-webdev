(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);

    function pageNewController(PageService, $location, $routeParams){
        var vm=this;

        vm.createPage=createPage;

        function init(){
            vm.userId=$routeParams.uid;
            vm.websiteId=$routeParams.wid;

            PageService
                .findPageByWebsite(vm.websiteId)
                .then(function(pages){
                    vm.pages = pages.data;
                });
        }
        init();

        function createPage() {
            PageService.createPage(vm.websiteId, angular.copy(vm.page));
            vm.pages=PageService.findPageByWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages");
        }
    }
})();