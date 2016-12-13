/**
 * Created by mayank on 12/11/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("CommentsController", CommentsController);

    function CommentsController($routeParams, $location, ArticleCommentService, UserService)
    {
        console.log("inside CommentsController controller");
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.deleteComment = deleteComment;
            vm.deleteCommentAlert = false;
        }
        init();

        function deleteComment(user) {
            var promise = UserService.deleteUser(user);
            promise.success(function (users) {
                console.log(users);
                findAllUsers();
                vm.deleteCommentAlert = true;
            })
        }

        function findAllComments() {
            var promise = ArticleCommentService.findAllComment();
            promise.success(function (comments) {
                console.log(comments);
                vm.comments = comments;
            })
        }
        findAllComments();

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

