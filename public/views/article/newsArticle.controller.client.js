/**
 * Created by mayank on 12/9/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("NewsArticleController", NewsArticleController);

    function NewsArticleController($routeParams, $location, NewsArticleService, $window, ArticleCommentService)
    {
        console.log("inside news article controller");
        var vm = this;
        var userId = $routeParams.uid;

        function setCurrentArticle() {
            var articleStored = JSON.parse(localStorage.getItem("articleClicked"));
            console.log("articleStored");
            console.log(articleStored);
            var promise = NewsArticleService.findArticleByTitle(articleStored.title);
            promise.success(function (response) {
                if(response !== null){
                    vm.article = response;
                }
                else
                    vm.article = articleStored;
            })
        }
        setCurrentArticle();

        function init() {

            vm.sourceId = $routeParams.sid;
            vm.gotoArticle = gotoArticle;
            vm.addArticleToFavorites = addArticleToFavorites;
            vm.addComment = addComment;
        }
        init();



        function addComment(commentIp) {
            commentIp.createdByUser = userId;
            var promise = NewsArticleService.findArticleByTitle(articleStored.title);
            promise.success(function (response) {
                if(response !== null){
                    var promise = ArticleCommentService.createComment(response._id, commentIp);
                    promise.success(function (response) {
                        console.log(response);
                    })
                }
            })
        }
        
        function addArticleToFavorites() {
            var article = {"article": vm.article, "comments":[]};
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