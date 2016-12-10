/**
 * Created by mayank on 12/9/16.
 */

(function() {
    angular
        .module("NewsApp")
        .controller("NewsFeedsController", NewsFeedsController);

    function NewsFeedsController($routeParams, $location, NewsFeedsService, $window)
    {
        console.log("inside news sources controller");
        var vm = this;
        var cnt = $routeParams.cnt;
        var cat = $routeParams.cat;
        var sid = $routeParams.sid;

        function init() {
            vm.dispNewsDetails = dispNewsDetails;
        }
        init();

        var sid = $routeParams.sid;

        var promise = NewsFeedsService.fetchNewsById(sid);
        promise.success(function (newsFeeds) {
            console.log(newsFeeds);
            vm.newsFeeds = newsFeeds;
        });

        function dispNewsDetails(article) {
            localStorage.setItem("articleClicked", JSON.stringify(article));
            $location.url("/sources/"+ cnt + "/" + cat + "/" + sid + "/article");
        }
    };

})();

