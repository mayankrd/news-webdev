/**
 * Created by mayank on 10/15/16.
 */

(function() {
    angular.module("NewsApp") .config(Config);

    function Config($routeProvider) {
        $routeProvider

            // routing for logged in user

            .when("/user/:uid/search/:q", {
                templateUrl: "/views/search/search.view.client.html",
                controller: "NewsSearchController",
                controllerAs: "model"
            })

            .when("/sources/user/:uid", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            })

            .when("/sources/user/:uid/:category", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            })

            .when("/sources/user/:uid/:cnt/:cat/:sid", {
                templateUrl: "/views/feeds/newsFeeds.view.client.html",
                controller: "NewsFeedsController",
                controllerAs: "model"
            })

            .when("/sources/user/:uid/:cnt/:cat/:sid/article", {
                templateUrl: "/views/article/newsArticle.view.client.html",
                controller: "NewsArticleController",
                controllerAs: "model"
            })

            .when("/profile/:uid", {
                templateUrl: "/views/user/dashboard/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/favorites/:uid", {
                templateUrl: "/views/user/dashboard/favorites.view.client.html",
                controller: "FavoritesController",
                controllerAs: "model"
            })

            .when("/comments/:uid", {
                templateUrl: "/views/user/dashboard/comments.view.client.html",
                controller: "CommentsController",
                controllerAs: "model"
            })

            .when("/manageUsers/:uid", {
                templateUrl: "/views/user/dashboard/manage-users.view.client.html",
                controller: "ManageUsersController",
                controllerAs: "model"
            })

            .when("/addAdmin/:uid", {
                templateUrl: "/views/user/dashboard/add-admin.view.client.html",
                controller: "AddAdminController",
                controllerAs: "model"
            })

            // routing for non-logged in user

            .when("/", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "/views/user/login/login.view.client.html",
                controller: "LoginUserController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "/views/user/register/register.view.client.html",
                controller: "RegisterUserController",
                controllerAs: "model"
            })

            .when("/search/:q", {
                templateUrl: "/views/search/search.view.client.html",
                controller: "NewsSearchController",
                controllerAs: "model"
            })

            .when("/sources", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            })

            .when("/sources/:category", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            })

            .when("/sources/:cnt/:cat/:sid", {
                templateUrl: "/views/feeds/newsFeeds.view.client.html",
                controller: "NewsFeedsController",
                controllerAs: "model"
            })

            .when("/sources/:cnt/:cat/:sid/article", {
                templateUrl: "/views/article/newsArticle.view.client.html",
                controller: "NewsArticleController",
                controllerAs: "model"
            });
    }
})();