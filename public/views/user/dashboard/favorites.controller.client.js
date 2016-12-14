/**
 * Created by mayank on 12/11/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($routeParams, $location, UserService, NewsArticleService, $route)
    {
        console.log("inside FavoritesController controller");
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.removeFromFavs = removeFromFavs;
            vm.articleRemovedAlert = false;
        }
        init();
        
        function removeFromFavs(article) {
            console.log("removeFromFavs");
            console.log(article);
            var currentUser = vm.user;
            console.log(currentUser);
            var updatedFavs = removeA(vm.user.favorites, article._id);
            console.log(updatedFavs);
            currentUser.favorites = updatedFavs;
            var promise = UserService.updateUser(currentUser);
            promise.success(function (updatedUser) {
                console.log("updatedUser");
                console.log(updatedUser);
                //$route.reload();
                setCurrentUser();
                vm.articleRemovedAlert = true;
            })
        }

        function setCurrentUser() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
                console.log(vm.user);
                vm.articles = findFavorites(user.favorites);
                console.log(vm.articles);
                if(vm.user.role === "admin") {
                    vm.adminUserFlag = true;
                }
            });
        }
        setCurrentUser();

        function findFavorites(favIds) {
            var articles = [];
            for(i = 0; i < favIds.length; i++)
            {
                var promise = NewsArticleService.findArticleById(favIds[i]);
                promise.success(function (article) {
                    articles.push(article);
                })
            }
            return articles;
        }


        // aux function
        function removeA(arr) {
            var what, a = arguments, L = a.length, ax;
            while (L > 1 && arr.length) {
                what = a[--L];
                while ((ax= arr.indexOf(what)) !== -1) {
                    arr.splice(ax, 1);
                }
            }
            return arr;
        }

    };

})();

