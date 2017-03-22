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
            "deleteUser": deleteUser
        };
        return api;

        function authenticate(name, pass) {
            console.log("authenticating "+name+" "+pass);
            return $http.get("/api/user?username="+name+"&password="+pass);
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

        function findUserByUsername(name){
            console.log("Finding by username.."+name);
            return $http.get("/api/user?username="+name);
        }

        function deleteUser(id){
            return $http.delete("/api/user/"+id);
        }
    }
})();