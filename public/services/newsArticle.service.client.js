/**
 * Created by mayank on 12/12/16.
 */
(function (){
    angular
        .module("NewsApp")
        .factory("NewsArticleService", NewsArticleService)

    function NewsArticleService($http) {

        var api = {

            createArticle: createArticle
        };

        return api;

        function createArticle(article)
        {
            var url = '/api/article';
            return $http.post(url, article);
        }
    }
})();