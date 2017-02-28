module.exports = function(app){
    console.log("WebAppMaker Server");

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUserById);

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        console.log("find user by credentials HTTP service");
        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        console.log(user);
        res.json(user);
    }

    function findUserById(req, res){
        var userId = req.params.userId;
        var user = users.find(function(u){
            return u._id == userId;
        });
        res.json(user);
    }

    function updateUserById(req, res){
        var userId = req.params.userId;
        var upuser = req.body;

        for(var u in users) {
            if( users[u]._id == userId ) {
                console.log(users[u]);
                users[u].firstName = upuser.firstName;
                users[u].lastName = upuser.lastName;
                users[u].email=upuser.email;
                users[u].username=upuser.username;
                res.json(users[u]);
                return;
            }
        }
        res.json(user);
    }
}