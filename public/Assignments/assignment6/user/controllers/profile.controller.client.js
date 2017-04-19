(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location, $rootScope){
        var vm = this;

        vm.update = update;
        vm.del = del;
        vm.logout = logout;

        function init(){
            console.log("In profile controller");
            var uid =  $routeParams.uid;
            console.log(uid);
            var promise = UserService.findUserById(uid);

            promise.success(function(user){
                vm.user = user;
                console.log(user);
                vm.updateduser=angular.copy(vm.user);
            });
        }
        init();

        function update(){
            console.log(vm.updateduser);
            UserService
                .updateUserById($routeParams.uid, vm.updateduser)
                .success(function(user){
                    if(user != null)
                        vm.message="Your profile has been updated"
                    else
                        vm.error="The user wasn't found";
                });
        }


        function del (user){
            if(confirm("Do you really want to delete your profile?")){
                UserService
                    .deleteUser($routeParams.uid)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function logout(){
            var promise = UserService.logout();
            promise.success(function(response){
                console.log(response);
                $rootScope.currentUser = null;
                $location.url("/");
            })
        }
    }
})();