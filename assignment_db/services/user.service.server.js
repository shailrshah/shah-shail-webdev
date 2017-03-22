module.exports = function (app, userModel){
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);


    function createUser(req, res){
        var user = req.body;
        console.log(user);

        userModel
            .createUser(user)
            .then(function (newUser){
                    res.send(newUser);
            }, function (error){
                    res.sendStatus(400).send(error);
            });
    }

    function deleteUser(req, res){
        var uid = req.params.userId;
        console.log(uid);
        var promise = userModel.deleteUser(uid);
        promise.then(function (status){
            res.sendStatus(200);
        },function (error){
            console.log("LOL");
            res.sendStatus(400).send(error);
        });
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.userId;
        console.log(uid);
        console.log(user);
        userModel
            .updateUser(uid, user)
            .then(function (status){
                res.sendStatus(200);
            }, function (error){
                res.sendStatus(400).send(error);
            });
    }

    function findUser(req, res){
        var params = req.params;
        var query = req.query;
        if (query.password && query.username){
            findUserByCredentials(req, res);
        } else if (query.username){
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function(users){
                if (users.length > 0)
                    res.json(users[0]);
                    else
                        res.json(null);
                }, function (err){
                    res.sendStatus(400).send(err)
            });
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username, password)
            .then(function (users){
                if (users.length > 0)
                    res.json(users[0]);
                else
                    res.send(null);
            }, function (error){
                    res.sendStatus(400).send(error);
            });
    }

    function findUserById(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then( function (user){
                if (user)
                    res.send(user);
                else
                    res.send(null);
            }, function (error){
                    res.sendStatus(400).send(error);
            });
    }
};