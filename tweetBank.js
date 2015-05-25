var _ = require('underscore');

var data = [];
var largestId = 0;
module.exports = {
    list: function() {
        return _.clone(data)
    },
    find: function(query) {
        return _.where(data, query)
    },
    add: function(name, tweet) {
        largestId = data.push({
            name: name,
            tweet: tweet,
            id: largestId
        })
    }
}

var randArrayEl = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
    var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
    var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
    return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
    var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
    return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
    module.exports.add( getFakeName(), getFakeTweet());
//add( getFakeName(), getFakeTweet() );
}


console.log(module.exports.list())
