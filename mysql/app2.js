 var express=require('express');
const PORT=4006;

var app=express();
app.use('/',express.static('./static'));

app.listen(PORT,function(){
	console.log('服务器已经启动，正在监听%d端口',PORT);
});
