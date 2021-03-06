/**
 * Created by mayank on 12/10/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("RegisterUserController", RegisterUserController);

    function RegisterUserController($location, UserService, $window)
    {
        console.log("inside register user controller");
        var vm = this;

        function init() {
            vm.register = register;
        }
        init();

        function register(user) {
            user.email = "";
            user.role = "user";
            user.favorites = [];
            if(typeof user.username !== "undefined" && typeof user.password !== "undefined" && typeof user.name !== "undefined")
            {
                var promise = UserService.createUser(user);
                promise.success(function (response) {
                    console.log(response);
                    localStorage.setItem("loggedInUser", JSON.stringify(response));
                    $window.location.reload();
                    $location.url('/profile/' + response._id);
                })
            }
        }

    };

})();

