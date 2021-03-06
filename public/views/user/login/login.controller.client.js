/**
 * Created by mayank on 12/10/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("LoginUserController", LoginUserController);

    function LoginUserController($location, UserService, $window)
    {
        console.log("inside login user controller");
        var vm = this;

        function init() {
            vm.findUserByCredentials = findUserByCredentials;
            vm.alert = false;
        }
        init();

        function findUserByCredentials(user) {
            if(typeof user.username !== "undefined" && typeof user.password !== "undefined")
            {
                var promise = UserService.findUserByCredentials(user);
                promise.success(function (response) {
                    console.log(response);
                    if(response === null) {
                        vm.alert = true;
                    }
                    else{
                        localStorage.setItem("loggedInUser", JSON.stringify(response));
                        $window.location.reload();
                        $location.url('/sources/user/' + response._id);
                    }
                })
            }
        }
    };

})();