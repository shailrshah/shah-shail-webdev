(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location){
        var vm = this;
        vm.update = update;
        vm.del = del;

        function init(){
            var uid =  $routeParams.uid;
            vm.user = UserService.getUserById(uid);
            vm.updateduser=angular.copy(vm.user);
        }
        init();

        function update(uid, user){
            if(UserService.updateUserById(uid, user)){
                vm.message="Your profile has been updated"
            }
            else {
                vm.error="The user wasn't found";
            }
        }

        function del (uid){
            if(UserService.deleteUser(uid)){
                $location.url("/#login");
            }
            else vm.error = "An error occured. Counldn't find your username";
        }
    }
})();