/**
 * Created by mayank on 12/13/16.
 */

(function (){
    angular
        .module("NewsApp")
        .factory("NewsSearchService", NewsSearchService)

    function NewsSearchService($http) {
        console.log("NewsSearchService");
        var api = {

            searchNewsByQuery: searchNewsByQuery
        };

        return api;

        function searchNewsByQuery(query) {

            var req = {
                method: 'GET',
                url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + query + '&mkt=en-us',
                headers: {
                    'Ocp-Apim-Subscription-Key': 'a52f9e1489464597b706a9a639fa4d90'
                },
            }

            $http(req)
                .then(function(resposne){
                    console.log("resposne");
                    console.log(resposne);
                }, function(response1) {
                    console.log("resposne1");
                    console.log(response1)
                });
        }
        searchNewsByQuery();
    }
})();