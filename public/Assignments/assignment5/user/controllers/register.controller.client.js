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

        function register(user2){
            UserService
                .getUserByUsername(user2.username)
                .success(function(user1){
                    if(user1===false){
                        UserService
                            .createUser(user2)
                            .then(function (user3){
                                vm.user = user3.data;
                                if (vm.user != null)
                                    $location.url("/user/" + vm.user._id);
                                else
                                    vm.error="Registering failied";
                            })
                    }
                    else vm.error="already taken";
                })
        }
    }
})();