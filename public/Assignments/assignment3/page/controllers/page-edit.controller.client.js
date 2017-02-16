(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController(PageService, $location, $routeParams){
        var vm = this;       //the controller's instance, containing info about view
        vm.userId=$routeParams.uid;


        vm.update = update;
        vm.del = del;

        function init(){
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;
            vm.pages = PageService.findPageByWebsite(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function update(){
            PageService.updatePage(vm.pageId, vm.page);
            console.log(vm.page);
        }

        function del(){
            console.log("Trying")
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages");
        }
    }
})();
