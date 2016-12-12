/**
 * Created by mayank on 12/10/16.
 */
module.exports = function (app, model) {

    var CommentModel = model.commentModel;
    var ArticleModel = model.articleModel;

    console.log("inside comment server service");

    app.post('/api/comment/:aid', createComment);
    app.post('/api/findAllComment', findAllComment);
    app.get('/api/comment/:cid', findCommentById);
    app.put('/api/comment/:cid', updateCommentById);
    app.delete('/api/comment/:cid', deleteCommentById);


    function createComment(req, res){
        var articleId = req.params.aid;
        var comment = req.body;
        console.log(comment);
        CommentModel.createComment(articleId, comment)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteCommentById(req, res){
        var commentId = req.params.cid;
        var comments;
        CommentModel.deleteCommentById(commentId)
            .then(
                function(doc){
                    comments = doc;
                    res.json(comments);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateCommentById(req, res){
        var commentId = req.params.cid;
        var commParams = req.body;
        var comment;
        console.log("commParams");
        console.log(commParams);
        console.log(commentId);
        CommentModel.updateCommentById(commentId, commParams)
            .then(
                function(doc){
                    comment = doc;
                    res.json(comment);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findCommentById(req, res){
        var commentId = req.params.cid;
        console.log(commentId);
        var comment;
        CommentModel.findCommentById(commentId)
            .then(
                function(doc){
                    comment = doc;
                    console.log("current comment");
                    console.log(comment);
                    res.json(comment);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllComment(req, res){
        var comments = [];
        CommentModel.findAllComment()
            .then(
                function(doc){
                    comments = doc;
                    res.json(comments);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function login(req, res){
        var user = req.user;
        //UserModel.setUserLoggedIn(user._id);
        res.json(user);
    }

    function logout(req, res){
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res){
        res.send(req.isAuthenticated()? req.user: '0');
    }
};