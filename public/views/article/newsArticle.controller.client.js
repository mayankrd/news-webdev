/**
 * Created by mayank on 12/9/16.
 */
(function() {
    angular
        .module("NewsApp")
        .controller("NewsArticleController", NewsArticleController);

    function NewsArticleController($routeParams, $location, NewsArticleService, $window, ArticleCommentService, UserService)
    {
        console.log("inside news article controller");
        var vm = this;
        var userId = $routeParams.uid;

        function setCurrentArticle() {
            var articleStored = JSON.parse(localStorage.getItem("articleClicked"));
            console.log("articleStored");
            console.log(articleStored);
            console.log(articleStored.article.title);
            var promise = NewsArticleService.findArticleByTitle(articleStored.article.title);
            console.log(promise);
            promise.success(function (response) {
                if(response !== null){
                    console.log("existing article");
                    vm.article = response.article;
                    vm.comments = response.comments;
                    vm.existingArticleFlag = true;
                    console.log(vm.article);
                    console.log(vm.comments);
                }
                else
                    vm.article = articleStored.article;
            })
        }
        setCurrentArticle();

        function init() {

            vm.sourceId = $routeParams.sid;
            vm.gotoArticle = gotoArticle;
            vm.addArticleToFavorites = addArticleToFavorites;
            vm.addComment = addComment;
        }
        init();

        function addComment(commentIp) {

            if (typeof userId !== "undefined") {
                var promise = UserService.findUserById(userId);
                promise.success(function (user) {

                        commentIp.createdByUser = user;
                        commentIp.date = Date.now();

                        //check if it's an existing article in DB
                        var promise = NewsArticleService.findArticleByTitle(vm.article.title);
                        promise.success(function (response) {
                            // add comment to the same article if its an existing article in DB
                            if (response !== null) {
                                var promise = ArticleCommentService.createComment(response._id, commentIp);
                                promise.success(function (response) {
                                    console.log(response);
                                    setCurrentArticle();
                                })

                                //update user with
                            }
                            //add this article to DB and the comment to the newly created article
                            else {
                                var article = {"article": vm.article, "comments": []};
                                var promise = NewsArticleService.createArticle(article);
                                promise.success(function (response) {
                                    console.log(response);
                                    // adding comment to the newly created article in DB
                                    var promise = ArticleCommentService.createComment(response._id, commentIp);
                                    promise.success(function (response) {
                                        console.log(response);
                                        setCurrentArticle();
                                    })
                                })
                            }
                        })
                });
            }
            else{
                vm.loginCommentAlert = true;
            }
        }
        
        function addArticleToFavorites() {
            if (typeof userId !== "undefined") {
                console.log(userId);
                var promise = UserService.findUserById(userId);
                promise.success(function (user) {
                    console.log(user);
                    var currentUser = user;
                    //check if it's an existing article in DB
                    var promise = NewsArticleService.findArticleByTitle(vm.article.title);
                    promise.success(function (response) {
                        // if it's an existing article then add the existing articleId to the current user's favorites list
                        if (response !== null) {
                            //remove article from user's favorites if it already exists in favorites
                            var index = checkIfArticleInFavs(currentUser, response);
                            if(index > -1){
                                //console.log(currentUser.favorites.splice(index, 1));
                                console.log(index);
                                console.log(currentUser);
                                var currFavs = currentUser.favorites;
                                console.log("before");
                                console.log(currFavs);
                                currFavs.splice(0, 1);
                                console.log(currFavs);
                                //todo
                                /*var promise = UserService.updateUser(currentUser);
                                promise.success(function (updatedUser) {
                                    console.log("updatedUser");
                                    console.log(updatedUser);
                                    vm.articleRemovedAlert = true;
                                })*/
                            }
                            //update user with articleId added to favorites list
                            else{
                                console.log(currentUser);
                                currentUser.favorites.push(response._id);
                                var promise = UserService.updateUser(currentUser);
                                promise.success(function (updatedUser) {
                                    console.log("updatedUser");
                                    console.log(updatedUser);
                                    vm.articleAddedAlert = true;
                                })
                            }
                        }
                        // if it's not an existing article then create a new article and add its articleId to user's favorites
                        else {
                            var article = {"article": vm.article, "comments": []};
                            var promise = NewsArticleService.createArticle(article);
                            promise.success(function (response) {
                                console.log(response);
                                //update user with articleId added to favorites list
                                console.log(currentUser);
                                currentUser.favorites.push(response._id);
                                var promise = UserService.updateUser(currentUser);
                                promise.success(function (updatedUser) {
                                    console.log("updatedUser");
                                    console.log(updatedUser);
                                    vm.articleAddedAlert = true;
                                })
                            })
                        }
                    });
                });
            }
            else{
                vm.loginFavoritesAlert = true;
            }
        }
        
        function checkIfArticleInFavs(user, article) {
            for (i = 0; i < user.favorites.length; i++) {
                var str1 = user.favorites[i].toString();
                var str2 = article._id.toString();
                console.log(str1);
                console.log(str2);
                if(str1 === str2){
                    console.log("matched strs");
                    console.log(str1);
                    console.log(str2);
                    console.log(i);
                    return i;
                }
                else{
                    return -1;
                }
            }
        }


/*            var article = {"article": vm.article, "comments":[]};

            if(vm.existingArticleFlag === true){
                //add article id to user's favorites list

                var currentUser;
                console.log(userId);
                var promise = UserService.findUserById(userId);
                promise.success(function (user) {
                    currentUser = user;
                });

                //update user with articleId added to favorites list
                currentUser.favorites.add(article._id);

                var promise = UserService.updateUser(currentUser);
                promise.success(function (updatedUser) {
                    console.log("updatedUser");
                    console.log(updatedUser);
                })

            }
            else{
                var promise = NewsArticleService.createArticle(article);
                promise.success(function (response) {
                    console.log(response);
                    //add article id to user's favorites list
                })
            }
        }*/

        function gotoArticle(articleUrl) {
            $window.open(articleUrl);
        }

    };

})();