(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);






    function configuration($routeProvider){

        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            console.log("Checking if logged in");
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                console.log(user);
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    console.log("okay");
                    deferred.resolve();
                } else {
                    console.log("Not okay");
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };

        $routeProvider

            .when("/user/:uid/websites/:wid/pages/:pid/widgets/:wgid/flickrsearch",{
                templateUrl: 'widget/templates/widget-flickr.view.client.html',
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/:wid/pages/:pid/widgets/new",{
                templateUrl: "widget/templates/widget-chooser.view.client.html",
                controller: "WidgetNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/:wid/pages/:pid/widgets/:wgid",{
                templateUrl: "widget/templates/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/:wid/pages/:pid/widgets",{
                templateUrl: "widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/:wid/pages/", {
                templateUrl: "page/templates/page-list.view.client.html",
                controller: "PagesController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/:wid/pages/new",{
                templateUrl: "page/templates/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/:wid/pages/:pid",{
                templateUrl: "page/templates/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/user/:uid", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                //resolve: { loggedin: checkLoggedin }
            })

            // .when("/user/:uid", {
            //     templateUrl: "user/templates/profile.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs: "model"
            // })

            .when("/user/:uid/websites", {
                templateUrl: "website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/user/:uid/websites/new", {
                templateUrl: "website/templates/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/websites/:wid", {
                templateUrl: "website/templates/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })






            // .otherwise({redirectTo : '/login'})

    }
})();