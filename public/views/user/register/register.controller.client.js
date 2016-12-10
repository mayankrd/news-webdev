/**
 * Created by mayank on 12/10/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("RegisterUserController", RegisterUserController);

    function RegisterUserController($location, UserService)
    {
        console.log("inside register user controller");
        var vm = this;

        function init() {
            vm.register = register
        }
        init();

        function register(user) {
            console.log(user);
            var promise = UserService.createUser(user);
            promise.success(function (response) {
                console.log(response);
            })
        }

    };

})();

