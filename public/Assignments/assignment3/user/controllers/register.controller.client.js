(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController(UserService,$location){
        var vm = this;
        vm.register = register;

        function init(){
            //nothing to do here
        }
        init();

        function register(user){
            if(UserService.getUserByUsername(user.username)){
                vm.error="Already exists!"
                return;                                 //can add some jQuery validation later
            } else if(user.password1!=user.password2){
                vm.error="Passwords don't match";
                return;
            } else{
                var id  = UserService.createUser(user);
                $location.url("/user/"+id);
            }
        }
    }
})();