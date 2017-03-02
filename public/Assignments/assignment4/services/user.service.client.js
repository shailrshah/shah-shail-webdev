(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var users = [
            {
                _id: "123",
                username: "alice",
                password: "alice",
                email: "alice@gmail.com",
                firstName: "Alice",
                lastName: "Wonder"
            },
            {
                _id: "234",
                username: "bob",
                password: "bob",
                email: "bob@gmail.com",
                firstName: "Bob",
                lastName: "Marley"
            },
            {
                _id: "345",
                username: "charly",
                password: "charly",
                email: "charly@gmail.com",
                firstName: "Charly",
                lastName: "Garcia"
            },
            {
                _id: "456",
                username: "jannunzi",
                password: "jannunzi",
                email: "jannunzi@gmail.com",
                firstName: "Jose",
                lastName: "Annunzi"
            }
        ];

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