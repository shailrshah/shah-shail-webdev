(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", "pageListController");

    function pageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init(){
            vm.pages = PageService.findPageByWebsite(vm.websiteId);
            console.log(pages);
        }
        init();


    }
})();