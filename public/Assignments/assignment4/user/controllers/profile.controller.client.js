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
            var promise = UserService.getUserById(uid);

            promise.success(function(user){
                vm.user = user;
                vm.updateduser=angular.copy(vm.user);
                console.log(vm.user);
            });
        }
        init();

        function update(uid, user){
            UserService
                .updateUserById(uid, user)
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
                    .deleteUser(user._id)
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