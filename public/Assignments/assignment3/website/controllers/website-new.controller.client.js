(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);

        vm.create = create;

        function init(){
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function create(){
            console.log("Trying to create.");
            console.log(vm.website);
            WebsiteService.createWebsite(vm.userId, vm.website);
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
    }
})();
