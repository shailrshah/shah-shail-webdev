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
            console.log(vm.websiteId);
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites.data;
                    console.log(vm.websites);
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(website){
                   vm.website=website.data;
                   console.log(vm.website);
                   console.log(website.data);
                });
        }
        init();

        function updateWebsite(){
            console.log(vm.website);
            WebsiteService.updateWebsite(vm.websiteId, vm.website);
            $location.url("/user/"+vm.userId+"/websites");
        };

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/websites");
        };
    }
})();