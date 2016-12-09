/**
 * Created by mayank on 12/9/16.
 */
(function (){
    angular
        .module("NewsApp")
        .factory("NewsFeedsService", NewsFeedsService)

    function NewsFeedsService($http) {

        var api = {

            fetchNewsById: fetchNewsById
        };

        return api;

        function fetchNewsById(sourceId) {

            var url = 'https://newsapi.org/v1/articles?source=' + sourceId + '&apiKey=bcb8944e7062461c9985724b44d83dfb';
            return $http.get(url);
        }
    }
})();