var express = require( 'express' )
var morgan = require('morgan')
var swig = require('swig')
//var routes = require('./routes/');
var socketio = require('socket.io');
var app = express()
var bodyParser = require('body-parser')



app.engine('html', swig.renderFile);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use( '/', routes(io) );

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
var server = app.listen(3000)
var io = socketio.listen(server);
app.use(require('./routes/index.js')(io))
