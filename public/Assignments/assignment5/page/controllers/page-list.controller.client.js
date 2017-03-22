(function(){
    angular
        .module("WebAppMaker")
        .controller("PagesController", pagesController);

    function pagesController(PageService, $location, $routeParams){
        var vm = this;       //the controller's instance, containing info about view

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
    }
})();