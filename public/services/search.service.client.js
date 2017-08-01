/**
 * Created by mayank on 12/13/16.
 */

(function (){
    angular
        .module("NewsApp")
        .factory("NewsSearchService", NewsSearchService)

    function NewsSearchService($http,$q) {
        var api = {

            searchNewsByQuery: searchNewsByQuery
        };

        return api;

        // function to search for articles on Microsoft API for the searched query
        function searchNewsByQuery(query) {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + query + '&mkt=en-us',
                headers: {
                    'Ocp-Apim-Subscription-Key': 'a52f9e1489464597b706a9a639fa4d90'
                },
            }

            $http(req)
                .then(function(resposne){

                    deferred.resolve(resposne);

                   console.log(resposne);
                 //   return resposne;
                }, function(response1) {
                    console.log("resposne1");
                    deferred.reject(response1);
                   // return resposne1;
                });

            console.log(deferred.promise)
            return deferred.promise;
        }
    }
})();