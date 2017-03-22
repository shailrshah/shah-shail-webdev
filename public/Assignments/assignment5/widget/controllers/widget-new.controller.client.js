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
           WidgetService
               .createWidget(vm.pageId,type)
               .success(function (widget) {
                   vm.widgetId=widget._id;
                   $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+vm.widgetId)
               });
       }
   }
})();