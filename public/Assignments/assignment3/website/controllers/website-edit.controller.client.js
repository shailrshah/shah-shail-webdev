(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", websiteEditController);

    function websiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        vm.websiteId = $routeParams.wid;

        vm.deleteWebsite=deleteWebsite;
        vm.updateWebsite=updateWebsite;

        function init(){
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(){
            console.log("Trying to update");
            WebsiteService.updateWebsite(vm.websiteId, vm.website);
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        };

        function deleteWebsite () {
            console.log("Trying to delete");
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/websites");
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        };
    }
})();