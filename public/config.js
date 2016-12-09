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

            .when("/sources/:lan/:cat/:sid", {
                templateUrl: "/views/newsFeeds.view.client.html",
                controller: "NewsfeedsController",
                controllerAs: "model"
            })

            .when("/demo", {
                templateUrl: "/views/demo.html",
                controller: "NewsfeedsController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "/views/sources/newsSources.view.client.html",
                controller: "NewsSourcesController",
                controllerAs: "model"
            });
    }
})();