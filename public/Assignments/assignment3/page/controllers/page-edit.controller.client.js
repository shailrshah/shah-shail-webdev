// (function(){
//     angular
//         .module("WebAppMaker")
//         .controller("PageEditController", pageEditController);
//
//     function pageEditController(PageService, $location, $routeParams){
//         var vm = this;       //the controller's instance, containing info about view
//
//         vm.userId=$routeParams.uid;
//         vm.websiteId=$routeParams.wid;
//         vm.pageId=$routeParams.pid;
//
//         //Event Handler
//         vm.update = update;
//         vm.del = del;
//
//         function init(){
//             vm.page = PageService.findPageById(vm.pageId);
//         }
//         init();
//
//         function update(){
//
//         }
//
//         function del(){
//
//         }
//     }
// })();

(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController(PageService, $location, $routeParams){
        var vm = this;       //the controller's instance, containing info about view

        vm.userId=$routeParams.uid;
        vm.pageId=$routeParams.pid;

        function init(){
            vm.websiteId=$routeParams.wid;
            vm.pages = PageService.findPageByWebsite(vm.websiteId);
        }
        init();
    }

})();
