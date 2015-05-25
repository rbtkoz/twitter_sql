var express = require( 'express' )
var morgan = require('morgan')

var app = express()
app.use(morgan('dev'));

app.get('/', function (req, res, next) {
    res.send('Hello World!');
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening on port', port);

});