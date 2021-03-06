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
    }
})();