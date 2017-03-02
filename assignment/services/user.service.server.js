module.exports = function (app) {
    app.get("/api/user/", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user/", createUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function findUser(req, res) {
        console.log("Finding user");
        var username = req.query.username;
        var password = req.query.password;
        console.log(username);
        console.log(password);

        if (username != null && password != null) {
            console.log("logging in");
            findUserByCredentials(req, res);
        } else if (username) {
            console.log("duplicate check");
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        console.log("New user request")
        var newUser = req.body;
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        console.log("New user pushed: "+newUser);
        res.json(newUser);
    }

    function findUserByUsername(req, res) {
        console.log("Finding user by username");
        console.log(req.query.username+" end");
        var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        if (user) {
            res.json(user);
            console.log("User found: "+user);
        } else {
            console.log("User not found");
            res.send(false);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log("find user by credentials HTTP service");
        var user = users.find(function (user) {
            return user.password == password && user.username == username;
        });
        console.log(user);
        res.json(user);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.userId;
        var upuser = req.body;

        for (var u in users) {
            if (users[u]._id == userId) {
                console.log(users[u]);
                users[u].firstName = upuser.firstName;
                users[u].lastName = upuser.lastName;
                users[u].email = upuser.email;
                users[u].username = upuser.username;
                res.json(users[u]);
                return;
            }
        }
        res.json(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
}