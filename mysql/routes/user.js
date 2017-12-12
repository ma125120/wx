var pool=require('../db.js').pool;
var crypto=require('crypto');

const USER=require('../util/types.js').USER;

var connectAsync=function(fn,...options) {
	return new Promise((resolve,reject)=>{
		if(options.length&&options.length>0) {
			fn(...options,function(err,...params) {
				if(err) reject(err);
				resolve(...params);
			});
		} else {
			fn(function(err,...params) {
				console.log(params)
				if(err) reject(err);
				resolve(...params);
			});
		}
	})
}

var getAllUser=function(req,res) {
	connectAsync(pool.getConnection.bind(pool))
	.then(connection=>{
		return connectAsync(connection.query.bind(connection),
			`SELECT username FROM user`);
	}).then((results,fields)=>{
		if(req.query.dev) {
	    res.send(results);
	  } else {
	    res.send({ code:2,msg:'没有登录' });
	  }
	  connection.release();
	}).catch(err=>{
		console.log(err);
	})
	// pool.getConnection(function(err, connection) {
	//     connection.query(`SELECT username FROM user`, function (error, results, fields) {
	//       if (error) throw error;
	//       if(req.query.dev) {
	//         res.send(results);
	//       } else {
	//         res.send({ code:2,msg:'没有登录' });
	//       }
	//       connection.release();
	//     });
	//  });
};

var getUserById=function(req,res) {
	pool.getConnection(function(err, connection) {
	    connection.query(`SELECT username FROM user WHERE user_id=? `,[req.params('user_id')], function (error, results, fields) {
	      if (error) throw error;
	      if(req.query.dev) {
	        res.send(results);
	      } else {
	        res.send({ code:2,msg:'没有登录' });
	      }
	      //connection.release();
	      connection.release();
	    });
	 });
};

var login=function(req,res) {
	pool.getConnection(function(err, connection) {
		var {username,password}=req.query;
		if(!username) {
			res.send(USER.USERNAME_EMPTY);
			return;
		}
		if(!password) {
			res.send(USER.PWD_EMPTY);
			return;
		}
		var pwd=crypto.createHash('sha512').update(password).digest('base64').toString();
	    connection.query(`SELECT username,password,id_card,real_name FROM user WHERE username=? AND password=? `,
	    	[username,pwd], function (error, results, fields) {
	      if (error) throw error;
	      if(results.length>0) {
	      	res.send(results[0]);
	      } else {
	      	res.send(USER.USERNAME_OR_PWD_ERROR);
	      }
	      //connection.release();
	      connection.release();
	    });
	 });
}

var regist=function(req,res) {
	pool.getConnection(function(err, connection) {
		var {username,password}=req.query;
		if(!username) {
			res.send(USER.USERNAME_EMPTY);
			return;
		}
		if(!password) {
			res.send(USER.PWD_EMPTY);
			return;
		}
		var pwd=crypto.createHash('sha512').update(password).digest('base64').toString();
	  connection.query(`INSERT INTO user(username,password) VALUES(?,?)`,
	    	[username,pwd], function (error, results, fields) {
	      if (error) throw error;
	      if(results.insertId) {
	      	res.send(USER.SUCCESS);
	      } else {
	      	res.send(USER.REGIST_FAIL);
	      }
	      //connection.release();
	      connection.release();
	    });
	 });
}

module.exports={
	getAllUser,
	getUserById,
	login,
	regist
}
/*

fieldCount
affectedRows
insertId
serverStatus
warningCount
message
changeRows
 */