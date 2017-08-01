/**
 * Created by mayank on 12/11/16.
 */

(function() {
    angular
        .module("NewsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($routeParams, $location, NewsSourcesService, UserService, NewsSearchService, $window)
    {
        // setting model to current object
        var vm = this;
        var userId = $routeParams.uid;

        // call to function to fetch all news sources
        var promise = NewsSourcesService.fetchAllSources();
        promise.success(function (sources) {
            vm.sources = sources;
            vm.countries = getCountries(sources);
            vm.categories = getCategories(sources);
        });

        // on page load initializations
        function init() {
            vm.getSources = getSources;
            vm.getNewsFeeds = getNewsFeeds;
            vm.showNewsSources = showNewsSources;
            vm.gotoHome = gotoHome;
            vm.searchNews = searchNews;
            vm.logoutUser = logoutUser;
        }
        init();

        // function to toggle flags to control logout and login visibility
        function logoutUser() {
            localStorage.removeItem("loggedInUser");
            vm.loggedInUserAlert = false;
            $window.location.reload();
            $location.url("/sources");
        }

        // function to retrieve news search results as per input query
        function searchNews(query) {
            var uid = $routeParams.uid;
            if(typeof uid !== "undefined"){
                $location.url('/user/' +uid+ '/search/'+ query);
            }
            else
                $location.url('/search/' + query);

        }

        // function to redirect user to home page on clicking home icon
        function gotoHome() {
            var userId = $routeParams.uid;
            if(typeof userId !== "undefined"){
                $location.url("/sources/user/" + userId);
            }
            else{
                $location.url("/sources/general");
            }
        }

        // function to set current user status flags
        function setCurrentUser() {
            //todo routeparam not having userId
            var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if(loggedInUser !== null) {
                vm.loggedInUserAlert = true;
                    vm.userId = loggedInUser._id;
                    vm.username = loggedInUser.username;
            }
        }
        setCurrentUser();

        // function to display news sources based on selected category
        function showNewsSources(category) {
            var uid = $routeParams.uid;
            if(typeof uid !== "undefined"){
                $location.url('/sources/user/' +uid+ '/'+ category);
            }
            else
                $location.url('/sources/' + category);

        }

        // function to set current user id and associated flags
        function setUser(userId) {
            if(typeof userId === "undefined"){
                vm.logoutLink = false;
            }
            else {
                vm.logoutLink = true;
            }

        }

        // function to get news feeds based on selected news source
        function getNewsFeeds(newsSource)
        {
            var cnt = newsSource.country;
            var cat = newsSource.category;
            var sid = newsSource.id;
            var userId = $routeParams.uid;
            if(typeof userId !== "undefined"){
                $location.url("/sources/user/"+ userId + "/" + cnt + "/" + cat + "/" + sid);
            }
            else
                $location.url("/sources/"+ cnt + "/" + cat + "/" + sid);
        }

        // returns the news sources as per selected country and category
        function getSources(category)
        {
            var result = [];
            for(var s in vm.sources.sources)
            {
                if(category === vm.sources.sources[s].category)
                {
                    result.push(vm.sources.sources[s]);
                }
            }
            vm.newssources = result;
        }

        // return the list of all unique countries from the input news sources json object
        function getCountries(sources)
        {
            var results = [];
            for (var s in sources.sources)
            {
                results.push(sources.sources[s].country);
            }

            return removeDuplicates(results);
        }

        // takes json of news sources and return the categories
        function getCategories(sources)
        {

            var results = [];
            for (var s in sources.sources)
            {
                results.push(sources.sources[s].category);
            }
            return removeDuplicates(results);
        }

        // takes an array of strings and returns the array with duplicates removed
        function removeDuplicates(strings)
        {
            var uniqueStrings = [];
            for(s in strings)
            {
                if(isUniqueString(uniqueStrings, strings[s]))
                {
                    uniqueStrings.push(strings[s]);
                }
            }
            return uniqueStrings;
        }

        // function to check if a string is unique among a list of strings
        function isUniqueString(uniqueStrings, str)
        {
            for(c in uniqueStrings)
            {
                if(uniqueStrings[c] === str)
                {
                    return false;
                }
            }
            return true;
        }
    };

})();

