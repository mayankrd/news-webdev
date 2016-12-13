/**
 * Created by mayank on 12/11/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($routeParams, $location, UserService)
    {
        console.log("inside FavoritesController controller");
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
        }
        init();

        function setCurrentUser() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
                if(vm.user.role === "admin") {
                    vm.adminUserFlag = true;
                }
            });
        }
        setCurrentUser();
    };

})();

