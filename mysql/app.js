var express=require('express');
var bodyParser=require('body-parser');
const axios=require('axios');
var session=require('express-session');
var querystring = require('querystring');
var pool=require('./db.js').pool;
var mysql    = require('mysql');
const PORT=4006;
var route=require('./route.js');

var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('../mysql'));
app.use(session({
  secret: ' keyboard cat ',
  cookie: {maxAge: 60000 },
  name:'auth'
}));
app.use(function(req,res,next) {
  res.set({
      'Access-Control-Allow-Origin':'*'
  });
  next();
});

route(app);

app.listen(PORT,function(){
	console.log('服务器已经启动，正在监听%d端口',PORT);
});

// cheerio request iconv-lite async
/* subject=/C=TY/ST=ShanXi/L=Taiyuan/O=TaiYuan BaiChuan/OU=I don't know/CN=Ma Pengda/emailAddress=1251208555@qq.com
Getting Private key */