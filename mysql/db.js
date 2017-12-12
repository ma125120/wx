var mysql      = require('mysql');
const OPTIONS={
  host     : '127.0.0.1',
  port:3306,
  user     : 'root',
  password : '125120',
  database : 'test',
  multipleStatements: true
};
// var connection = mysql.createConnection(OPTIONS);

// connection.connect();

// connection.query('SELECT *FROM `user` WHERE `username`=?',['root3'], function (error, results, fields) {
//   if (error) throw error;
//   console.log('返回结果： ', results);
// });

// connection.end();


const pool = mysql.createPool(OPTIONS);

// pool.getConnection(function(err, connection) {
// 	connection.query('SELECT *FROM `user` ', function (error, results, fields) {
// 	  if (error) throw error;
// 	  console.log('返回结果： ', results,fields[0].name);
// 	  //connection.release();
// 	  connect.destory(); 
// 	});
// });

// var query = connection.query('SELECT * FROM posts');
// query
//   .on('error', function(err) {
//     // Handle error, an 'end' event will be emitted after this as well
//   })
//   .on('fields', function(fields) {
//     // the field packets for the rows to follow
//   })
//   .on('result', function(row) {
//     // Pausing the connnection is useful if your processing involves I/O
//     connection.pause();

//     processRow(row, function() {
//       connection.resume();
//     });
//   })
//   .on('end', function() {
//     // all rows have been received
//   });
var m='123';
var s=[1,2,3];
module.exports={
	pool
}