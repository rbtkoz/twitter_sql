//var people = [{name: 'Alex'}, {name: 'Balex'}, {name: 'Dalex'}];
//
//app.get('/', function (req, res, next) {
//    //res.send('Hello World!');
//    res.render( 'index', {title: 'Hall of Fame', people: people} );
//});
//

var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'A Tweeeee', tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'A Tweeee - Posts by ',tweets: list} );
});


///users/:name/tweets/:id
//users/Emma%20Tilde/tweets/0
router.get('/users/:name/tweets/:id', function(req, res){
    console.log("hitting it")
    var name = req.params.name;
    var id = req.params.id;
    var list = tweetBank.find({id:Number(id)})
    res.render('index', {title: "A Tweee", tweets:list, name:name, id:id})
});


module.exports = router;