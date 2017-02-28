(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location){
        var vm = this;       //the controller's instance, containing info about view

        //Event Handler
        vm.login = login;

        function init(){
            //Nothing to do
        }
        init();

        function login(user){
            if(user==null)
                return vm.error="Enter the credentials";
            var id = UserService.authenticate(user.username, user.password);
            if(id!=null) {
                $location.url("/user/"+id);
            } else{
                vm.error = "Not authenticated.";
                console.log(vm.error);
            }
        }
    }
})();