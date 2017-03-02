(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "createUser": createUser,
            "getUserById": getUserById,
            "getUserByUsername": getUserByUsername,
            "authenticate": authenticate,
            "updateUserById": updateUserById,
            "deleteUser": deleteUser
        };
        return api;

        function authenticate(name, pass) {
            return $http.get("/api/user?username="+name+"&password="+pass);
        }

        function getUserById(id) {
            return $http.get("/api/user/"+id);
        }

        function updateUserById(id, updatedUser) {
              return $http.put("/api/user/"+id, updatedUser);
        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
        }

        function getUserByUsername(name){
            return $http.get("/api/user?username="+name);
        }

        function deleteUser(id){
            return $http.delete("/api/user/"+id);
        }
    }
})();