/**
 * Created by mayank on 12/10/16.
 */
(function(){
    angular
        .module("NewsApp")
        .factory("UserService", UserService)

    function UserService($http, $rootScope){

        var api = {

            // method declarations
            createUser : createUser,
            findUserByCredentials : findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            updateUser : updateUser,
            deleteUser : deleteUser
        };

        return api;

        function createUser(user)
        {
            var url = '/api/user';
            return $http.post(url, user);
        }

        function findUserByCredentials(user){
            return $http.post('api/getUserByCredentials', user);
        }

        function findAllUsers(callback)
        {
            var url = '/api/admin';
            callback($http.get(url));
        }

        function findUserById(uid)
        {
            var url = '/api/user/' + uid;
            return $http.get(url);
        }

        function deleteUser(user, callback)
        {
            var url = '/api/admin/' + user._id;
            callback($http.delete(url));
        }

        function updateUser(user, callback)
        {
            console.log("user at service client");
            console.log(user);
            var url  = '/api/admin/' + user["_id"];
            callback($http.put(url, JSON.stringify(user)));
        }
    }
})();