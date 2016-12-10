/**
 * Created by mayank on 10/15/16.
 */

(function() {
    angular.module("NewsApp") .config(Config);

    function Config($routeProvider) {
        console.log("inside route provider");
        $routeProvider

            .when("/sources", {
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
            })

            .when("/demo", {
                templateUrl: "/views/demo.html",
                controller: "NewsFeedsController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            });
    }
})();