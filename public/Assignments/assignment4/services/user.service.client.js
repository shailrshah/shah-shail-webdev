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
            // for (var u in users) {
            //     var user = users[u];
            //     if (user.username === name && user.password == pass) {
            //         return user._id;    // _id uniquely identifies the user.
            //     }                       // not returning entire object. Might be unsecure!
            // }
            // return null;

            return $http.get("/api/user?username="+name+"&password="+pass);
        }

        function getUserById(id) {
            // for (var u in users) {
            //     var user = users[u];
            //     if (user._id === id) {
            //         var info = angular.copy(user);
            //         delete info.password; //don't want the asker to get the password
            //         return info;
            //     }
            // }
            // return null;

            return $http.get("/api/user/"+id);
        }

        function updateUserById(id, updatedUser) {
            // for (var u in users) {
            //     var user = users[u];
            //     if (user._id === id) {
            //         user.username = updateduser.username;
            //         user.email = updateduser.email;
            //         user.firstName = updateduser.firstName;
            //         user.lastName = updateduser.lastName;
            //         return true;
            //     }
            // }
            // return false;

            return $http.put("/api/user/"+id, updatedUser);
        }

        function createUser(newUser) {
            var id=(new Date()).getTime().toString();
            newUser._id = id;
            users.push(newUser);
            return id;
        }

        function getUserByUsername(username){
            for (var u in users) {
                var user = users[u];
                if (user.username === username) {
                    console.log("Found user");
                    console.log(user);
                    return user;
                }
            }
            return false;
        }

        function deleteUser(id){
            console.log("Service started.")
            for (var i in users) {
                var user = users[i];
                if (user._id === id){
                    users.splice(i, 1);
                    console.log("Removed user");
                    return true;
                }
            }
            return false;
        }
    }
})();