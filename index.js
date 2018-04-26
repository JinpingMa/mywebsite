const express = require('express');
const app = express();
app.all('*',function (req, res, next) {
  //cors
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
]
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



//配置服务端口
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})