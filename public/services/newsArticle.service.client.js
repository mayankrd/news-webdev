/**
 * Created by mayank on 12/12/16.
 */
(function (){
    angular
        .module("NewsApp")
        .factory("NewsArticleService", NewsArticleService)

    function NewsArticleService($http) {

        var api = {

            createArticle: createArticle,
            findArticleByTitle: findArticleByTitle
        };

        return api;

        function findArticleByTitle(title) {
            var url = '/api/articleTitle/' + title;
            return $http.get(url);
        }

        function createArticle(article)
        {
            var url = '/api/article';
            return $http.post(url, article);
        }
    }
})();