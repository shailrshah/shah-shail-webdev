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
        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByUsername(req, res) {
        var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        if (user) {
            res.json(user);
        } else {
            res.send(false);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (user) {
            return user.password == password && user.username == username;
        });
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