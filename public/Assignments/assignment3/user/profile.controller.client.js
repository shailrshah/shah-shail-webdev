(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location){
        var vm = this;
        vm.update = update;
        vm.del = del;

        function init(){
            console.log("Initializing ProfileController");
            var uid =  $routeParams['uid'];
            var userInfo = UserService.getUserById(uid);
            console.log(userInfo);

            vm.user = userInfo;
            vm.updateduser=angular.copy(vm.user);
        }
        init();

        function update(uid, user){
            if(UserService.updateUserById(uid, user)){
                console.log("updated user");
                console.log(user);
                vm.message="Your profile has been updated"
            }
            else {
                vm.error="The user wasn't found";
                console.log(vm.error);
            }
        }

        function del (uid){
            console.log("Trying to delete");
            if(UserService.deleteUser(uid)){
                console.log("Deleted");
                $location.url("/#login");
            }
        }
    }
})();