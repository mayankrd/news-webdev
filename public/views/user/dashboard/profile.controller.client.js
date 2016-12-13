/**
 * Created by mayank on 12/11/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService)
    {
        var vm = this;
        var userId = $routeParams.uid;

        function init() {
            vm.userId = userId;
            vm.userUpdated = false;
            vm.updateUser = updateUser;
        }
        init();

        function updateUser(user) {
            console.log(user);
            var promise = UserService.updateUser(user);
            promise.success(function (updatedUser) {
                console.log("updatedUser");
                console.log(updatedUser);
                vm.userUpdated = true;
            })
        }

        function setCurrentUser() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
                if(vm.user.role === "admin") {
                    vm.adminUserFlag = true;
                }
                return user;
            });
        }
        setCurrentUser();
    };

})();

