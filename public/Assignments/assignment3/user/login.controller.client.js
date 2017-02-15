(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService){
        var vm = this;       //the controller's instance, containing info about view

        vm.login = login;

        function init(){
            console.log("initialized LoginController");
        }
        init();

        function login(user){
            console.log("log in button clicked.");
            console.log(user);
        }


    }
})();