(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController(UserService,$location){
        var vm = this;
        vm.register = register;

        function init(){
            console.log("Initializing RegisterController");
        }
        init();

        function register(user){
            if(UserService.getUserByUsername(user.username)){
                vm.error="Already exists!"
                return;
            } else if(user.password1!=user.password2){
                vm.error="Passwords don't match";
                return;
            } else{
                var id  = UserService.createUser(user);
                console.log("User created!");
                $location.url("/user/"+id);
            }
        }
    }
})();