/**
 * Created by mayank on 11/23/16.
 */

(function (){
    angular
        .module("NewsApp")
        .factory("NewsSourcesService", NewsSourcesService)

    function NewsSourcesService($http) {

        var api = {

            fetchAllSources: fetchAllSources
        };

        return api;

        function fetchAllSources() {

            var url = 'https://newsapi.org/v1/sources?language=en';
            return $http.get(url);
        }
    }
})();
