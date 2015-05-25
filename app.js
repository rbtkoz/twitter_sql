var express = require( 'express' )
var morgan = require('morgan')
var swig = require('swig')
var routes = require('./routes/');

var app = express()



app.use('/', routes);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening on port', port);

});