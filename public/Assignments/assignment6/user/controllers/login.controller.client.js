(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;

        //Event Handler
        vm.login = login;

        function init() {
            //Nothing to do
        }

        init();

        function login(user) {
            console.log(user);
            if (user == null)
                return vm.error = "Enter the credentials";

            var promise = UserService.authenticate(user);
            promise.success(function (user1) {
                user2 = user1[0];
                console.log(user2);
                console.log(user2._id);
                if (user2){
                    $rootScope.currentUser = user2;
                    console.log("Rootscope");
                    console.log($rootScope.currentUser);
                    console.log("Switching to profile page"+$rootScope.currentUser._id);
                    $location.url("/user/" + user2._id);
                }
                else vm.error = "Not authenticated.";
            })

        }


    }
})();