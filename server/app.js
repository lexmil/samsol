const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

var generator = require(__dirname + '/lib/generator.js');

server.listen(3000);

app.get('*', function (req, res) {
  res.send('Server listening on port 3000');
});

io.on('connection', (socket) => {
  let timer = setInterval(() => {
    socket.emit('data', JSON.stringify({ 
      cpu: generator.cpu(),
      pkg: generator.pkg()
    }));   
  }, 1000);

  socket.on('disconnect', (reason) => {
    clearInterval(timer);
    console.log('Disconnected:', reason);
  })
});

console.log('Server listening on port 3000');