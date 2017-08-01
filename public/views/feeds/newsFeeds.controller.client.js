/**
 * Created by mayank on 12/9/16.
 * Controller to display news feeds as per the selected source in news sources page
 */

(function() {
    angular
        .module("NewsApp")
        .controller("NewsFeedsController", NewsFeedsController);

    function NewsFeedsController($routeParams, $location, NewsFeedsService, $window)
    {
        var vm = this;
        var cnt = $routeParams.cnt;
        var cat = $routeParams.cat;
        var sid = $routeParams.sid;

        // initializations on page load
        function init() {
            vm.dispNewsDetails = dispNewsDetails;
            vm.sourceName = localStorage.getItem("sourceName");
        }
        init();

        // fetching sid from current route params
        var sid = $routeParams.sid;

        var promise = NewsFeedsService.fetchNewsById(sid);
        promise.success(function (newsFeeds) {
            vm.newsFeeds = newsFeeds;
        });

        // function to redirect to display specific news article details
        function dispNewsDetails(article) {
            var userId = $routeParams.uid;
            var articleClicked = {"article": article, "comments":[]};
            localStorage.setItem("articleClicked", JSON.stringify(articleClicked));
            if(typeof userId !== "undefined"){
                $location.url("/sources/user/"+ userId + "/" + cnt + "/" + cat + "/" + sid + "/article");
            }
            else
                $location.url("/sources/"+ cnt + "/" + cat + "/" + sid + "/article");
        }
    };

})();

