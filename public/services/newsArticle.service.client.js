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
            findArticleByTitle: findArticleByTitle,
            findArticleById: findArticleById
        };

        return api;

        function findArticleById(artId) {
            var url = '/api/article/' + artId;
            return $http.get(url);
        }

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