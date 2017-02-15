(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        console.log("userSercice invoked");

        var api={
            "findUserByCredentials": findUserByCredentials
        };

        function findUserByCredentials(name, pass){
            for(var u in users){
                user=user[u];
                if(user.username === name && user.password==pass){
                    console.log("Authenticated.");
                    return user;
                }
            }
            console.log("Combination incorrect.");
            return null;
        }
    }
})();