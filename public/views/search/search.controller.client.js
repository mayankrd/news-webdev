/**
 * Created by mayank on 12/13/16.
 */

(function() {
    angular
        .module("NewsApp")
        .controller("NewsSearchController", NewsSearchController);

    function NewsSearchController($routeParams, $location, NewsSearchService)
    {
        console.log("inside NewsSearchController controller");
        var vm = this;
        var query = $routeParams.q;

        function init() {
            vm.searchNews = searchNews;
            vm.query = query;
        }
        init();

        function searchNews() {
            NewsSearchService.searchNewsByQuery(query).then(function (res) {
                vm.results = res.data.value;
                console.log(vm.results);
            });
        }
        searchNews();
    };

})();