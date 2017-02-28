(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", widgetNewController);

   function widgetNewController($routeParams, WidgetService, $location){
       var vm = this;
       vm.create = create;

       function init(){
           vm.userId = $routeParams.uid;
           vm.websiteId = $routeParams.wid;
           vm.pageId = $routeParams.pid;
       }
       init();

       function create(type) {
           console.log(type);
           var widgetId = WidgetService.createWidget(vm.pageId, type);
           $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+widgetId);
       }
   }
})();