/**
 * Created by mayank on 12/10/16.
 */
module.exports = function (app, model) {

    var ArticleModel = model.articleModel;

    console.log("inside article server service");

    app.post('/api/article', createArticle);
    app.post('/api/findAllarticles', findAllArticles);
    app.get('/api/article/:aid', findArticleById);
    app.put('/api/article/:aid', updateArticleById);
    app.delete('/api/article/:aid', deleteArticleById);

    function deleteArticleById(req, res){
        var artId = req.params.aid;
        var articles;
        ArticleModel.deleteArticleById(artId)
            .then(
                function(doc){
                    articles = doc;
                    res.json(articles);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateArticleById(req, res){
        var artId = req.params.aid;
        var userParams = req.body;
        var article;
        console.log("userparams");
        console.log(userParams);
        console.log(artId);
        ArticleModel.updateArticleById(artId, userParams)
            .then(
                function(doc){
                    article = doc;
                    res.json(article);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findArticleById(req, res){
        var artId = req.params.aid;
        console.log(artId);
        var article;
        ArticleModel.findArticleById(artId)
            .then(
                function(doc){
                    article = doc;
                    console.log("current user");
                    console.log(article);
                    res.json(article);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllArticles(req, res){
        var articles = [];
        ArticleModel.findAllArticles()
            .then(
                function(doc){
                    articles = doc;
                    res.json(articles);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function createArticle(req, res){
        var article = req.body;
        console.log(article);
        ArticleModel.createArticle(article)
            .then(
                function(doc){
                    article = doc;
                    res.json(article);
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