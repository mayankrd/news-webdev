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

            var promise = UserService.findUserById(userId);
            promise.success(function (user) {

                if(user !== null) {
                    commentIp.createdByUser = user;

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
                }
                else{
                    vm.loginAlert = true;
                }

            });
        }
        
        function addArticleToFavorites() {
            var article = {"article": vm.article, "comments":[]};

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
        }

        function findUserById() {

        }

        function addArticleToUsersFavList(articleId) {

        }

        function gotoArticle(articleUrl) {
            $window.open(articleUrl);
        }

    };

})();