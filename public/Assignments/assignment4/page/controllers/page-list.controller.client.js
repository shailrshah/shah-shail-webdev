(function(){
    angular
        .module("WebAppMaker")
        .controller("PagesController", pagesController);

    function pagesController(PageService, $location, $routeParams){
        var vm = this;       //the controller's instance, containing info about view

        vm.userId=$routeParams.uid;

        function init(){
            vm.websiteId=$routeParams.wid;
            console.log(vm.websiteId);
            vm.pages = PageService.findPageByWebsite(vm.websiteId);
            console.log(vm.pages);
        }
        init();
    }

})();