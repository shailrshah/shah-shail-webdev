(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location){
        var vm = this;

        //Event Handler
        vm.login = login;

        function init(){
            //Nothing to do
        }
        init();

        function login(user){
             if(user==null)
                 return vm.error="Enter the credentials";

            var promise = UserService.authenticate(user.username, user.password);

            promise.success(function (user) {
                if(user) {
                    $location.url("/user/"+user._id);
                } else{
                    vm.error = "Not authenticated.";
                    console.log(vm.error);
                }
            })

        }
    }
})();