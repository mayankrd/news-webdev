/**
 * Created by mayank on 12/12/16.
 */
(function (){
    angular
        .module("NewsApp")
        .factory("ArticleCommentService", ArticleCommentService)

    function ArticleCommentService($http) {

        var api = {

            createComment: createComment,
            findAllComment: findAllComment
        };

        return api;

        function findAllComment() {
            var url = '/api/findAllComment';
            return $http.post(url);
        }

        function createComment(articleId, comment)
        {
            var url = '/api/comment/' + articleId;
            return $http.post(url, comment);
        }
    }
})();