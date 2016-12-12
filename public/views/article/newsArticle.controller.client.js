/**
 * Created by mayank on 12/9/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("NewsArticleController", NewsArticleController);

    function NewsArticleController($routeParams, $location, NewsArticleService, $window)
    {
        console.log("inside news article controller");
        var vm = this;
        //var article = $window.articleClicked;
        var articleStored = JSON.parse(localStorage.getItem("articleClicked"));
        console.log("articleStored");
        console.log(articleStored);

        function init() {
            vm.article = articleStored;
            vm.sourceId = $routeParams.sid;
            vm.gotoArticle = gotoArticle;
            vm.addArticleToFavorites = addArticleToFavorites;
        }
        init();
        
        function addArticleToFavorites() {
            var article = {"article": articleStored, "comments":[]};
            console.log("arti");
            console.log(article);
                var promise = NewsArticleService.createArticle(article);
                promise.success(function (response) {
                    console.log(response);
                })
        }

        function gotoArticle(articleUrl) {
            $window.open(articleUrl);
        }

    };

})();