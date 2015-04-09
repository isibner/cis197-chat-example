var express = require('express')
var hbs = require('express-hbs');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// In real life, you'd probably want something more permanent
// than an in-memory array to store your messages.
var allMessages = [];

app.use('/', express.static('public'))

app.get('/', function (req, res) {
  res.locals.messages = allMessages;
  res.render('chat');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg){
    allMessages.push(msg);
    io.emit('chat message', msg);
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function () {
  console.log('listening on port ' + port);
});
