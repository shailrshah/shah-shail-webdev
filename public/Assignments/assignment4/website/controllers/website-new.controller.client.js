(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;;
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.then(function(websites) {
                vm.websites = websites.data;
            });
        }
        init();

        function createWebsite(website) {
            console.log(website);
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/"+vm.userId+"/websites");
        };
    }
})();
