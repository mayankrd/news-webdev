/**
 * Created by mayank on 10/15/16.
 */

(function() {
    angular.module("NewsApp") .config(Config);

    function Config($routeProvider) {
        console.log("inside route provider");
        $routeProvider

            .when("/news", {
                templateUrl: "/views/newsfeeds.view.client.html",
                controller: "NewsfeedsController",
                controllerAs: "model"
            })

            .when("/demo", {
                templateUrl: "/views/demo.html",
                controller: "NewsfeedsController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "/views/newsfeeds.view.client.html",
                controller: "NewsfeedsController",
                controllerAs: "model"
            });
    }
})();