/**
 * Created by mayank on 12/9/16.
 */

(function() {
    angular
        .module("NewsApp")
        .controller("NewsFeedsController", NewsFeedsController);

    function NewsFeedsController($routeParams, $location, NewsFeedsService)
    {
        console.log("inside news sources controller");
        var vm = this;

        var sid = $routeParams.sid;
        console.log(sid);
        var promise = NewsFeedsService.fetchNewsById(sid);
        promise.success(function (newsFeeds) {
            console.log(newsFeeds);
            vm.newsFeeds = newsFeeds;
        });
    };

})();

