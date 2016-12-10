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

            var url = 'https://newsapi.org/v1/articles?source=' + sourceId + '&sortBy=latest&apiKey=bcb8944e7062461c9985724b44d83dfb';
            //https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=
            return $http.get(url);
        }
    }
})();