/**
 * Created by mayank on 12/13/16.
 */

module.exports = function (app, model) {

    console.log("inside search server service");

    app.get('/api/search/:query', searchNews);

    function searchNews(req, res, $http){

        var query = req.params.query;
        $http(req)
            .then(
                function(doc){
                    console.log(doc);
                    return doc;
                    //todo
                },
                function(err){
                    res.status(400).send(err);
                }
            )
        /* .then(function(resposne){
         return resposne.data;
         }, function(response1) {
         console.log("resposne1");
         return resposne1;
         });*/
    }
};