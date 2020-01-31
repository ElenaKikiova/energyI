// REQUIRE APP AND GENERAL FUNCTIONS
var app = require('../server');
var ObjectId = require('mongodb').ObjectID;
var getUserCookie = require('./functions/getUserCookie');


var Article = require('../schemas/articleSchema');

app.get('/blog', function(req, res){

    var idCookie = getUserCookie("id", req);
    mongoose.connect(baseUrl, { useNewUrlParser: true }, function(err, db) {
        Article.find({}).sort({ Pinned: 'desc' }).exec(function(err, articles) {
            res.render('blog', {Articles: articles, userId: idCookie});
        });
    });
});
