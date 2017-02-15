(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", "pageEditController");

    function pageEditController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.page = PageService.findPageById(vm.pageId);

        vm.editPage = editPage;
        vm.deletePage = deletePage;

        function editPage(id, page1){
            console.log("")
        }
    }
})();
