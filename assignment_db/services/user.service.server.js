module.exports = function (app, userModel){
    var passport = require('passport');
    var bcrypt = require('bcrypt-nodejs');

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);

    function loggedin(req, res) {
        console.log("Logging in:" + req.isAuthenticated());
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        console.log(user.password);
        console.log("In server");
        console.log(user);
        userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                console.log("Error occured");
                                res.status(400).send(err);
                            } else {
                                console.log("Successfully registered");
                                console.log(user);
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function login(req, res) {
        console.log("Logging in:" + req.isAuthenticated());
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        password = bcrypt.hashSync(password);
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    console.log(username+" "+password);
                    console.log("in local strategy");
                    console.log(user);
                    user.password = bcrypt.hashSync(user.password);
                    if(user[0].username == username && user[0].password == password) {
                        console.log("Match found");
                        return done(null, user);
                    } else {
                        console.log("Match not found");
                        console.log(user[0].username+" "+username);
                        console.log(user[0].password+" "+password);
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }




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