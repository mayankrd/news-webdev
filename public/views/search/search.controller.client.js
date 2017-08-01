/**
 * Created by mayank on 12/13/16.
 * Controller - To manipulate news search results view
 */

(function() {
    angular
        .module("NewsApp")
        .controller("NewsSearchController", NewsSearchController);

    function NewsSearchController($routeParams, NewsSearchService)
    {
        var vm = this;
        var query = $routeParams.q;

        function init() {
            vm.searchNews = searchNews;
            vm.query = query;
        }
        init();

        // function to search news as per the input keyword
        function searchNews() {
            NewsSearchService.searchNewsByQuery(query).then(function (res) {
                vm.results = res.data.value;
                console.log(vm.results);
            });
        }
        searchNews();
    };

})();