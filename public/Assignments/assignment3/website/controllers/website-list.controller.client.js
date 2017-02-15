(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);



        function init(){
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
        init();



    }
})();