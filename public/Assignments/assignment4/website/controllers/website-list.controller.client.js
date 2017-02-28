(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        function init(){
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
        init();
    }
})();