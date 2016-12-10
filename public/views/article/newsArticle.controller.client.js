/**
 * Created by mayank on 12/9/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("NewsArticleController", NewsArticleController);

    function NewsArticleController($routeParams, $location, NewsFeedsService, $window)
    {
        console.log("inside news article controller");
        var vm = this;
        var article = $window.articleClicked;
        
    };

})();