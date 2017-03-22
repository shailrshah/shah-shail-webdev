module.exports = function (app, userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user/", createUser);

    function findUser(req, res) {
        console.log("findUser");
        var username = req.query.username;
        var password = req.query.password;

        if (username != null && password != null) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function createUser(req, res) {
        console.log("createUser");
        var user = req.body;
        userModel
            .createUser(user)
            .then(function(newUser){
                console.log(newUser);
                res.send(newUser);
            }, function(error){
                console.log(error);
                res.sendStatus(400).send(error);
            });
    }

    function findUserByUsername(req, res) {
        console.log("findUserByUsername");
        var username = req.query.username;

        userModel
            .findUserByUsername(username)
            .then(function(users){
                if(users.length > 0){
                    res.json(users[0]);
                } else res.json(null);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }

    function findUserByCredentials(req, res) {
        console.log("findUserByCredentials");
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function(users){
                if(users.length > 0){
                    res.json(users[0]);
                } else res.json(null);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    };

    function findUserById(req, res) {
        console.log("findUserById");
        var userId = req.params.userId;
        console.log(userId);

        userModel
            .findUserById(userId)
            .then(function(users){
                if(users.length > 0){
                    res.json(users[0]);
                } else res.json(null);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }

    function updateUserById(req, res) {
        console.log("updateUserById");
        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function(status){
               res.sendStatus(200);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }

    function deleteUser(req, res) {
        console.log("deleteUser");
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function(status){
                res.sendStatus(200);
            }, function(error){
                res.sendStatus(400).send(error);
            });
    }
}