(function() {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm          = this;
        console.log("Flickr here");
        vm.userId          = $routeParams.uid;
        vm.websiteId          = $routeParams.wid;
        vm.pageId          = $routeParams.pid;
        vm.widgetId         = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto  = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    var updatedWidget = response.data;
                    updatedWidget.url = url;
                    WidgetService
                        .updateWidget(vm.widgetId, updatedWidget)
                        .then(function (response) {
                            var updatedWidgetObject = response;
                            if(updatedWidgetObject){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                            }
                        }, function (err) {
                            vm.updateerror = "Could not update the widget!";
                        });
                }, function (err) {
                    vm.updateerror = "Could not get the widget!";
                });
        }
    }
})();