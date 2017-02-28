(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;

        vm.create = create;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function create(){
            WebsiteService.createWebsite(vm.userId, vm.website);
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/websites");
        }
    }
})();
