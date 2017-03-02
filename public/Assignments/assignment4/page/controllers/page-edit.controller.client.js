(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController(PageService, $location, $routeParams){
        var vm = this;       //the controller's instance, containing info about view

        vm.update = update;
        vm.del = del;

        function init(){
            vm.userId=$routeParams.uid;
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;

            PageService
                .findPageByWebsite(vm.websiteId)
                .then(function(pages){
                    vm.pages = pages.data;
            });

            PageService
                .findPageById(vm.pageId)
                .then(function(page){
                vm.page = page.data;
            });
        }
        init();

        function update(){
            PageService.updatePage(vm.pageId, vm.page);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages");
        }

        function del(){
            console.log("Trying")
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages");
        }
    }
})();