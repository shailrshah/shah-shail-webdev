(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", websiteEditController);

    function websiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId=$routeParams.wid;

        console.log(vm.userId);

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        function init(){
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(){
            WebsiteService.updateWebsite(vm.websiteId, vm.website);
            $location.url("/user/"+vm.userId+"/websites");
        };

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/websites");
        };
    }
})();