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
            console.log(user);
            UserService
                .getUserByUsername(user.username)
                .success(function(u){
                    if(u){
                        vm.error = "Already Exists!";
                        return;
                    } else {
                        $location.url("/user/"+id);
                    }
                });
        }
    }
})();