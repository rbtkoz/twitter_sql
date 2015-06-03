//var people = [{name: 'Alex'}, {name: 'Balex'}, {name: 'Dalex'}];
//
//app.get('/', function (req, res, next) {
//    //res.send('Hello World!');
//    res.render( 'index', {title: 'Hall of Fame', people: people} );
//});
//
var express = require('express');
var User = require('../models/index.js').User;
var Tweet = require('../models/index.js').Tweet;
//------test------



//SELECT * FROM `Users` WHERE `id` = 1 ;
//SELECT * FROM `Tweets` WHERE `UserId` = 123;
//User.findById(1).then(function(user) {
//    user.getTweets().then(function(tweets) {
//        //console.log(tweets[0].dataValues);
//        JSON.stringify(tweets);
//    });
//});

//SELECT * FROM "Users";
User.findAll().then(function(user) {
//console.log(JSON.stringify(user));
})
Tweet.findAll().then(function(tweet) {
    //console.log(JSON.stringify(tweet));
})

////SELECT * FROM "Tweets";
//Tweet.findAll().then(function(tweet){
//    console.log(JSON.stringify(tweet));
//})

//Count all users
//User.count().then(function(ucount){
//    console.log(JSON.stringify("There are "+ucount +" users"));
//})

//Tweet.findAll({ include: [ User ] }).then(function(tweet) {
//    console.log(JSON.stringify(tweet));
//});

//User.findAll({ include: [ Tweet ] }).then(function(users) {
//    console.log(JSON.stringify(users))
//
//
//});

//Create a new user
//User.create({ name: 'foo', pictureUrl:"bar"}).then(function(user) {
//
//console.log("did it");
//})

//DELETE


//User.findById(12).then(function(user) {
//
//    user.destroy().then(function() {
//        console.log("delete");
//    })
//})
//
//Tweet.findById(1).then(function(user){
//    user.destroy().then(function(){
//
//    })
//})

//FIND ALL
//Tweet.findAll().then(function(users){
//    console.log(JSON.stringify(users));
//})
//User.findById(1).then(function(user){
//    //user.name = "a very differnt name now"
//    //user.save().then(function(){})
//    console.log(user.name);
//})


module.exports = function (io) {



var router = express.Router();
// could use one line instead: var router = require('express').Router();


router.get('/', function (req, res) {
    Tweet.findAll({
        include: [ User ]
    }).then(function(tweet) {
        //console.log(JSON.stringify(tweet));
        res.render( 'index', { showForm: true, title: 'Tw_02', tweets: tweet} );
    });
    //OLD ROUTE
    //var tweets = tweetBank.list()
    //res.render( 'index', { showForm: true, title: 'A Tweeeee', tweets: tweets } );
});


router.get('/users/:name', function(req, res) {
    Tweet.findAll({
        include:  [{
            model: User,
            where: { name : req.params.name  }
        }]
    }).then(function(tweet) {
        //console.log(JSON.stringify(tweet));
        res.render( 'index', { showForm: true,title: 'Tw_02- Posts by ',tweets: tweet} );
    });

    //OLD ROUTE
    //var name = req.params.name;
    //var list = tweetBank.find( {name: name} );
    //console.log(list);
    //res.render( 'index', { showForm: true,title: 'A Tweeee - Posts by ',tweets: list,name:name} );
});


router.post('/submit', function(req, res) {



    User.findOrCreate({where: {
               name: req.body.name}
    }).spread(function(user, creeated){
            console.log(user);

            Tweet.create({
                tweet:req.body.text,
                userId: user.id
            })
        })
        .error(function(err){
            console.log('Error occured' + err);
        });



//same as above but self rolled
    //User.findAll({
    //    where: {
    //        name: name
    //    }
    //}).then(function(users){
    //    if(users.length) {
    //        return users[0]
    //    } else {
    //        return User.create({
    //            name: req.body.name
    //        })
    //    }
    // })
    //    .then(function(user) {
    //
    //        Tweet.create({
    //            tweet:req.body.text,
    //            userId: user.id
    //
    //        })
    //    });



        res.redirect('/');


    //    console.log("hitting the route");
    //    //var name = req.body.name;
    //    //var text = req.body.text;
    //    //console.log(name, "name");
    //    //console.log(text,"text");
    //    //tweetBank.add(name, text);
    //    io.sockets.emit('new_tweet', {
    //        name: req.body.name,
    //        text: req.body.text
    //    });
    //res.redirect('/');
    //});
});


///users/:name/tweets/:id
//users/Emma%20Tilde/tweets/0
router.get('/users/:name/tweets/:id', function(req, res){
    var name = req.params.name;
    var id = req.params.id;

    Tweet.findAll({
        include:  [{
            model: User,
            where: { name : name, id: id }
        }]
    }).then(function(tweet) {
        //console.log(JSON.stringify(tweet));
        res.render('index', {title: "A Tweee", tweets:tweet})
    });
//OLD ROUTE
    //console.log("hitting it")
    //var name = req.params.name;
    //var id = req.params.id;
    //var list = tweetBank.find({id:Number(id)})
    //res.render('index', {title: "A Tweee", tweets:list, name:name, id:id})
});


return router

}