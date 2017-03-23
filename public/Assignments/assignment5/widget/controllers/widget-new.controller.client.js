(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", widgetNewController);

   function widgetNewController($routeParams, WidgetService, $location){
       var vm = this;


       function init(){
           console.log("In widgetNewController");
           vm.userId = $routeParams.uid;
           vm.websiteId = $routeParams.wid;
           vm.pageId = $routeParams.pid;
       }
       init();

       vm.createHeaderWidget = createHeaderWidget;
       vm.createHTMLWidget = createHTMLWidget;
       vm.createImageWidget = createImageWidget;
       vm.createYoutubeWidget = createYoutubeWidget;
       vm.createTEXTWidget = createTEXTWidget;

       function createTEXTWidget() {
           var widget = {  type: "TEXT",
               text: "Enter text here",
               rows: 1,
               placeholder: "Enter text",
               formatted: false};
           WidgetService
               .createWidget(vm.pageId, widget)
               .success(function (response) {
                   var newWidget = response;
                   if(newWidget){
                       console.log("New Widget made!");
                       $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+newWidget._id);
                   }
               })
               .error(function (response) {
                    console.log("some error occured");
               });
       }
       function createHeaderWidget(headerSize) {
           var widget = {type: "HEADING",
               size: headerSize.toString(),
               text: "Sample Heading "+headerSize}
           WidgetService
               .createWidget(vm.pageId, widget)
               .success(function (response) {
                   var newWidget = response;
                   if(newWidget){
                       console.log("New Widget made!");
                       $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+newWidget._id);
                   }
               })
               .error(function (response) {

               })
       }
       function createHTMLWidget() {
           var widget = {type: "HTML",
               text: "Sample <i>HTML</i> text"};
           WidgetService
               .createWidget(vm.pageId, widget)
               .success(function (response) {
                   var newWidget = response;
                   if(newWidget){
                       $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+newWidget._id+"?status=new");
                   }
               })
               .error(function (response) {

               })
       }
       function createImageWidget() {
           var widget = {type: "IMAGE",
               width: "100%",
               url: ""}
           WidgetService
               .createWidget(vm.pageId, widget)
               .success(function (response) {
                   var newWidget = response;
                   if(newWidget){
                       $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+newWidget._id+"?status=new");
                   }
               })
               .error(function (response) {

               })
       }
       function createYoutubeWidget() {
           var widget = {type: "YOUTUBE",
               width: "100%",
               url: "www.youtube.com/embed/bNa8xnVSQfg"}
           WidgetService
               .createWidget(vm.pageId, widget)
               .success(function (response) {
                   var newWidget = response;
                   if(newWidget){
                       $location.url("/user/"+vm.userId+"/websites/"+vm.websiteId+"/pages/"+vm.pageId+"/widgets/"+newWidget._id+"?status=new");
                   }
               })
               .error(function (response) {

               })
       }
   }
})();