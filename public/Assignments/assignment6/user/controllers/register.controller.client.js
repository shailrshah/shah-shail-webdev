(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController(UserService,$location, $rootScope){
        var vm = this;
        vm.register = register;

        function init(){

        }
        init();

        function register(user){
            if(user.password == user.password2){
                console.log("promising");
                var promise = UserService.findUserByUsername(user.username);

                promise
                    .success(function(returned_user){
                        if(returned_user==null){
                            UserService
                                .register(user)
                                .success(function(user){
                                    if(user==null){
                                        vm.error = "Failed to create user";
                                    } else{
                                        console.log("Made user");
                                        console.log(user);
                                        $rootScope.currentUser = user;
                                        $location.url("/user/"+user._id);
                                    }
                                });
                        }
                    })
            } else{
                vm.error = "Passwords do not match.";
            }
        }
    }
})();