(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
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
            for (var u in users) {
                var user = users[u];
                if (user.username === name && user.password == pass) {
                    console.log("Combination found.");
                    return user._id;    // _id uniquely identifies the user.
                }                       // not returning entire object. Might be unsecure!
            }
            console.log("Combination not found.");
            return null;
        }

        function getUserById(id) {
            for (var u in users) {
                var user = users[u];
                if (user._id === id) {
                    console.log("User details found");
                    var userInfo = {
                        _id: user._id, username: user.username, email: user.email,
                        firstName: user.firstName, lastName: user.lastName
                    };
                    console.log(userInfo);
                    return userInfo;            //I don't want to return password!
                }
            }
            return null;
        }

        function updateUserById(id, updateduser) {
            console.log("Trying to search for "+id)
            console.log(updateduser);
            for (var u in users) {
                var user = users[u];
                if (user._id === id) {
                    console.log("User details found");
                    user.username = updateduser.username;
                    user.email = updateduser.email;
                    user.firstName = updateduser.firstName;
                    user.lastName = updateduser.lastName;

                    console.log("User found. Details Updated");
                    return true;
                }
            }
            console.log("User not found");
            return false;
        }

        function createUser(user) {
            var id=(new Date()).getTime();
            var newUser = {_id: id, username: user.username, password: user.password1,
                            firstName: user.firstName, lastName: user.lastName , email: user.email}
            users.push(newUser);
            console.log(users);
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
            return null;
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