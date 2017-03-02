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

        function register(user) {
            var promise = UserService.createUser(user);
            promise.then(function (user) {
                vm.user = user.data;
                if (vm.user != null)
                    $location.url("/user/" + vm.user._id);
                else
                    vm.error("Registering failied");
            })
        }
    }
})();