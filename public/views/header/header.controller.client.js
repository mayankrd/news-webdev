/**
 * Created by mayank on 12/11/16.
 */

(function() {
    angular
        .module("NewsApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($routeParams, $location, NewsSourcesService, UserService, NewsSearchService, $window)
    {
        console.log("inside HeaderController");
        var vm = this;
        var userId = $routeParams.uid;

        var promise = NewsSourcesService.fetchAllSources();
        promise.success(function (sources) {
            vm.sources = sources;
            vm.countries = getCountries(sources);
            vm.categories = getCategories(sources);
        });

        function init() {
            vm.getSources = getSources;
            vm.getNewsFeeds = getNewsFeeds;
            vm.showNewsSources = showNewsSources;
            vm.gotoHome = gotoHome;
            //vm.setUser = setUser($routeParams.uid);
            vm.searchNews = searchNews;
            vm.logoutUser = logoutUser;
        }
        init();
        
        function logoutUser() {
            localStorage.removeItem("loggedInUser");
            console.log("loggedOut user");
            console.log(JSON.parse(localStorage.getItem("loggedInUser")));
            vm.loggedInUserAlert = false;
            $window.location.reload();
            $location.url("/sources");
        }

        function searchNews(query) {
            console.log(query);
            var promise = NewsSearchService.searchNewsByQuery(query);
            console.log(promise);
        }
        
        function gotoHome() {
            console.log("goto home");
            var userId = $routeParams.uid;
            if(typeof userId !== "undefined"){
                $location.url("/sources/user/" + userId);
            }
            else{
                $location.url("/sources");
            }
        }

        function setCurrentUser() {
            console.log($location.absUrl());
            //todo routeparam not having userId
            console.log($routeParams.uid);
            console.log("inisde setCurrentUser");

            var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            console.log("loggedIn user");
            console.log(loggedInUser);

            if(loggedInUser !== null) {
                vm.loggedInUserAlert = true;
                    vm.userId = loggedInUser._id;
                    vm.username = loggedInUser.username;
            }
        }
        setCurrentUser();


        function showNewsSources(category) {
            var uid = $routeParams.uid;
            if(typeof uid !== "undefined"){
                $location.url('/sources/user/' +uid+ '/'+ category);
            }
            else
                $location.url('/sources/' + category);

        }

        function setUser(userId) {
            console.log("called");
            console.log(userId);
            if(typeof userId === "undefined"){
                console.log("inside");
                vm.logoutLink = false;
            }
            else {
                vm.logoutLink = true;
            }

        }

        function getNewsFeeds(newsSource)
        {
            console.log(newsSource);
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
            console.log("getsources called");
            console.log(category);
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
                //console.log(sources.sources[s].category);
                results.push(sources.sources[s].category);
            }
            console.log(results);
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

