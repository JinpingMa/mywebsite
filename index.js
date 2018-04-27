const express = require('express');
const socket = require('socket.io');

//配置服务器
const app = express();
const server = app.listen(3000, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

//Static files
app.use(express.static('public'));

//socket setup
const io = socket(server);

io.on('connection', function(client){
  console.log('made socket connection and client id is: ', client.id);
  const msg = {};
  msg.name = client.id;
  msg.message = '上线';
  io.sockets.emit('message', msg);
  //event chat
  client.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });

  client.on('typing', function (data) {
      client.broadcast.emit('typing',data);
  });

  //event disconnect
    client.on('disconnect', function () {
      const disconnectMsg = {};
      disconnectMsg.name=client.id;
      disconnectMsg.message = '下线';
        console.log('client ' +client.id + ' disconnect');
        io.sockets.emit('chat',disconnectMsg)
	});
});


app.all('*',function (req, res, next) {
  //set cors response header
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Header', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,UPDATE');
  //with credentials
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('X-Powered-By','3.2.1');
  res.header('Content-Type','application/json;charset=utf-8');
  res.cookie('name', 'tobi', { expires: new Date(Date.now() + 900000), httpOnly: true});
  next();
});

const datas = [
  {
    name:'item1',
    value:34
  },{
  name:'item2',
    value:29
  }
];
//api
app.get('/data', function (req, res) {
  res.status(200);
  res.json(datas)
});

//jsonp
app.get('/jsonp', function (req, res) {
  res.status(200);
  res.jsonp(datas);
});



