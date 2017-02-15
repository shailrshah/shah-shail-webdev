(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location){
        var vm = this;       //the controller's instance, containing info about view

        vm.login = login;
        vm.user ={username: "", password: ""};

        function init(){
            console.log("initialized LoginController");
            console.log(vm.user);
        }
        init();

        function login(user){
            console.log("log in button clicked.");
            console.log(user.username + user.password);
            var id = UserService.authenticate(user.username, user.password);
            if(id!=null) {
                console.log("Authenticated.");
                console.log("The id of the user is "+id);
                $location.url("/user/"+id);
            } else{
                vm.error = "Not authenticated.";
                console.log(vm.error);
            }
        }


    }
})();