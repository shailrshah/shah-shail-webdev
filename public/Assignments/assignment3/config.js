(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/login", {
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
                controllerAs: "model"
            })

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

            .when("/pages", {
                templateUrl: "page/page-list.view.client.html",
                controllerAs: "model"
            })
            .when("/page-new", {
                templateUrl: "page/page-new.view.client.html",
                controllerAs: "model"
            })
            .when("/page-edit", {
                templateUrl: "page/page-edit.view.client.html",
                controllerAs: "model"
            })

            .when("/widgets",{
                templateUrl: "widget/widget-list.view.client.html",
                controllerAs: "model"
            })
            .when("/widget-chooser",{
                templateUrl: "widget/widget-chooser.view.client.html",
                controllerAs: "model"
            })
            .when("/widget-image",{
                templateUrl: "widget/widget-image.view.client.html",
                controllerAs: "model"
            })
            .when("/widget-heading",{
                templateUrl: "widget/widget-heading.view.client.html",
                controllerAs: "model"
            })
            .when("/widget-youtube",{
                templateUrl: "widget/widget-youtube.view.client.html",
                controllerAs: "model"
            })


            .otherwise({redirectTo : '/login'})

    }
})();