(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "authenticate": authenticate,
            "updateUserById": updateUserById,
            "deleteUser": deleteUser,
            "logout": logout,
            "register": register
        };
        return api;

        function logout(){
            return $http.post("/api/logout");
        }

        function authenticate(user) {
            console.log("authenticating "+user.username+" "+user.password);
            var user = $http.post("/api/login", user);
            return user;
        }

        function findUserById(id) {
            return $http.get("/api/user/"+id);
        }

        function updateUserById(id, updatedUser) {
            return $http.put("/api/user/"+id, updatedUser);
        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
        }

        function register(user){
            console.log("Trying to register. Sending post request");
            console.log(user);
            return $http.post("/api/register", user);
        }

        function findUserByUsername(name){
            console.log("Finding by username.."+name);
            return $http.get("/api/user?username="+name);
        }

        function deleteUser(id){
            return $http.delete("/api/user/"+id);
        }
    }
})();