/**
 * Created by mayank on 12/11/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("AddAdminController", AddAdminController);

    function AddAdminController($routeParams, $location, UserService)
    {
        console.log("inside AddAdminController controller");
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.addAdmin = addAdmin;
            vm.adminAddedAlert = false;
        }
        init();

        function addAdmin(user) {
            user.role = "admin";
            user.favorites = [];
            if(typeof user.username !== "undefined" && typeof user.password !== "undefined" && typeof user.name !== "undefined")
            {
                var promise = UserService.createUser(user);
                promise.success(function (response) {
                    console.log(response);
                    vm.adminAddedAlert = true;
                })
            }
        }
    };

})();

