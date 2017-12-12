var express=require('express');
var bodyParser=require('body-parser');
const axios=require('axios');
const PORT=4007;
var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('../mysql'));
app.use(function(req,res,next) {
  res.set({
      'Access-Control-Allow-Origin':'*'
  });
  next();
});

Promise.all([12,13].map((v)=>{
	return axios.get(`http://localhost:4006/getUser/${v}?dev=123`)
})).then(res=>{
	res.map(v=>{
		console.log(v.data);
	})
})



app.listen(PORT,function(){
	console.log('服务器已经启动，正在监听%d端口',PORT);
});

// cheerio request iconv-lite async