
var pool=require('./db.js').pool;
const axios=require('axios');
var querystring = require('querystring');

var user=require('./routes/user.js');
var {getAllUser,getUserById,login,regist}=user;

var requireAPILogin=require('./util/util.js').requireAPILogin;

var route=function(app) {

	app.get('/getUser/:user_id/',getUserById);
	app.get('/getAllUser/',getAllUser);
	//app.get('/getAllUser/',requireAPILogin,getAllUser);
	app.get('/regist/',regist);
	app.get('/login/',login);
	app.get('/',function(req,res) {
		if(req.session.login) {
			req.session.login=false;
			res.send('GET请求成功,已登录');
		} else {
			req.session.login=true;
				console.log(req.session)
			res.set({
				'Content-Type':'text/html;charset=utf8'
			});
			res.send('GET请求成功,未登录');
	}

	app.get('/*',function(req,res) {
		res.send({code:404,msg:'请求路径不合法'});
	});
});


}

module.exports=route;
