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
                console.log(user1);
                if (user1){
                    $rootScope.currentUser = user1;
                    $location.url("/user/" + user1[0]._id);
                }
                else vm.error = "Not authenticated.";
            })

        }


    }
})();