/**
 * Created by mayank on 10/17/16.
 */

(function() {
    angular
        .module("NewsApp")
        .controller("NewsSourcesController", NewsSourcesController);

    function NewsSourcesController($routeParams, $location, NewsSourcesService)
    {
        console.log("inside news sources controller");
        var vm = this;

        var promise = NewsSourcesService.fetchAllSources();
        promise.success(function (sources) {
            vm.sources = sources;
            vm.countries = getCountries(sources);
            vm.categories = getCategories(sources);
            vm.getSources = getSources;
            vm.getNewsFeeds = getNewsFeeds;
        });

        function getNewsFeeds(newsSource)
        {
            console.log(newsSource);
            var cnt = newsSource.country;
            var cat = newsSource.category;
            var sid = newsSource.id;
            $location.url("/sources/"+ cnt + "/" + cat + "/" + sid);
        }

        // returns the news sources as per selected country and category
        function getSources(country, category)
        {
            console.log("getsources called");
            console.log(country);
            console.log(category);
            var result = [];
            for(var s in vm.sources.sources)
            {
                if(country === vm.sources.sources[s].country && category === vm.sources.sources[s].category)
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



        /*console.log($routeParams);
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.userId = userId;
        vm.updateProfile = updateProfile;
        console.log(userId);

        function init()
        {
            UserService.findUserById(userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.user = user;
                        console.log(user);
                    }
                })
                .error (function() {
                    vm.alert = "Could not retrieve user";
                });
        }
        init();

        function updateProfile()
        {
            var promise = UserService.updateUser(userId, vm.user);
            promise.success(function(user){
                if(user === '0') {
                    vm.alert = "Unable to update user";
                } else {
                    console.log("updated user : "+user);
                    $location.url("/user/"+vm.userId);
                }
            });
        }
        /!*
         function updateProfile()
         {
         UserService.updateUser(user);
         $location.url("/user/"+vm.userId);
         console.log(user);
         //$location.url("/user/" + vm.userId + "/website");
         }*!/*/
    };

})();
