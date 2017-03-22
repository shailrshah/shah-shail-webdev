(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            console.log(vm.userId);
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.then(function (websites) {
                vm.websites = websites.data;
                console.log(vm.websites);
            });
        }
        init();
    }
})();