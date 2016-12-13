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
                .then(
                    function(doc){
                        console.log(doc);
                        //todo
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
               /* .then(function(resposne){
                    return resposne.data;
                }, function(response1) {
                    console.log("resposne1");
                    return resposne1;
                });*/
        }
    }
})();