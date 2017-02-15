(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/websites", {
                templateUrl: "website/website-list.view.client.html",
                controllerAs: "model"
            })
            .when("/website-new", {
                templateUrl: "website/website-new.view.client.html",
                controllerAs: "model"
            })
            .when("/website-edit", {
                templateUrl: "website/website-edit.view.client.html",
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