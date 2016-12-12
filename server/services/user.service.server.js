/**
 * Created by mayank on 12/10/16.
 */
module.exports = function (app, model) {

    var UserModel = model.userModel;

    console.log("inside user server service");

    app.post('/api/user', createUser);
    app.post('/api/getUserByCredentials', getUserByCredentials);
    app.post('/api/findAllUsers', findAllUsers);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req, res){
        var userId = req.params.uid;
        var users;
        UserModel.deleteUserById(userId)
            .then(
                function(doc){
                    users = doc;
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res){
        var userId = req.params.uid;
        var userParams = req.body;
        var user;
        console.log("userparams");
        console.log(userParams);
        console.log(userId);
        UserModel.updateUserById(userId, userParams)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res){
        var userId = req.params.uid;
        console.log(userId);
        var user;
        UserModel.findUserById(userId)
            .then(
                function(doc){
                    user = doc;
                    console.log("current user");
                    console.log(user);
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res){
        var users = [];
        UserModel.findAllUsers()
            .then(
                function(doc){
                    users = doc;
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function getUserByCredentials(req, res){
        var user = req.body;
        var credentials = {
            "username": user.username,
            "password": user.password
        };
        UserModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function createUser(req, res){
        var user = req.body;
        console.log(user);
        UserModel.createUser(user)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function login(req, res){
        var user = req.user;
        //UserModel.setUserLoggedIn(user._id);
        res.json(user);
    }

    function logout(req, res){
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res){
        res.send(req.isAuthenticated()? req.user: '0');
    }
};