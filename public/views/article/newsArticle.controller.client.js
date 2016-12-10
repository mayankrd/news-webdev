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
        //var article = $window.articleClicked;
        var article = JSON.parse(localStorage.getItem("articleClicked"));
        console.log(article);

        function init() {
            vm.article = article;
            vm.sourceId = $routeParams.sid;
            vm.gotoArticle = gotoArticle;
        }
        init();

        function gotoArticle(articleUrl) {
            $window.open(articleUrl);
        }

    };

})();