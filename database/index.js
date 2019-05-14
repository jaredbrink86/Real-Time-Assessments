var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'test'
});

// var selectAll = function(callback) {
//   connection.query("SELECT * FROM classes", function(err, results, fields) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// app.post('/students', (req, res) => {
//   const name = req.body.name;
//   const queryString = `INSERT INTO students (name) VALUES ('${name}')`
//   connection.query(queryString, (error, results) => {
//     if(error){
//       console.log(error)
//       res.status(404).json('Could not complete request')
//     } else {
//       res.json({student: results})
//     }
//   })
// })

module.exports.connection = connection;
