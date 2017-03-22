module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("userModel", userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;

    function setModel(model_arg){
        model = model_arg;
    }

    function createUser(user){
        return userModel.create(user);
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }

    function updateUser(userId, user){
        return userModel.update({_id: userID}, {$set: user});
    }

    function deleteUser(userId){
        //todo
    }

    function findUserByCredentials(user, pass){
        console.log("Logging in");
        return userModel.find({username: user, password: pass});
    }

    function findUserByUsername(user){
        return userModel.find({username: user});
    }
};