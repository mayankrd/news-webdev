/**
 * Created by mayank on 12/11/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("ManageUsersController", ManageUsersController);

    function ManageUsersController($routeParams, $location, $route, UserService)
    {
        console.log("inside ManageUsersController controller");
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.deleteUser = deleteUser;
            vm.deleteUserAlert = false;
        }
        init();
        
        function deleteUser(user) {
            var promise = UserService.deleteUser(user);
            promise.success(function (users) {
                console.log(users);
                findAllUsers();
                vm.deleteUserAlert = true;
            })
        }
        
        function findAllUsers() {
            var promise = UserService.findAllUsers();
            promise.success(function (users) {
                console.log(users);
                vm.users = users;
            })
        }
        findAllUsers();
    };

})();

