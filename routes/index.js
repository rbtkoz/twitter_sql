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
    res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

module.exports = router;