var USER={
	username:'root',
	pwd:'125120'
}
var requireAPILogin=function(req,res,next) {
	console.log(req.session.login);
	if(req.session&&req.session.login) {
		next();
		return;
	}
	var rha=req.headers.authorization;
	if(rha&&rha.search('Basic ')===0) {
		var creds=new Buffer(rha.split(' ')[1],'base64'.toString());
		var parts=creds.split(':');
		if(parts[0]==USER.username&&parts[1]==USER.pwd) {
			next();
			return;
		} else {
			res.setHeader('WWW-Authenticate','Basic realm="Authorization required"');
			res.send({code:4001,msg:'未登录'});
		}
	} else {
		res.setHeader('WWW-Authenticate','Basic realm="Authorization required"');
		res.send({code:4001,msg:'未登录'});
	}
}

module.exports={
	requireAPILogin
}