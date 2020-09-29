//node server  running at port 5000
const mysql = require('mysql')
var express = require('express');

var app = express();

var PORT = 5000;

app.get('/', function(req, res) {
    res.status(200).send('server is running');
 
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});




//var mysql = require('mysql');  

var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "",  
database: "users"  
});  
con.connect(function(err) {  
if (err) throw err;  
console.log("Connected!");  

// INSERT query
var sql = "INSERT INTO users ( username, password, role) VALUES ( 'Kgothatso', '33', 'south@k')";  
var sql = "INSERT INTO users ( username, password, role) VALUES ( 'john', '33', 'john@k')";  
var sql = "INSERT INTO users ( username, password, role) VALUES ( 'thabo', '33', 'tma@k')";   
con.query(sql, function (err, result) {  
if (err) throw err;  
console.log("1 record inserted");  
})

}); 


//SELECT query
con.query('SELECT * FROM users', (err,rows) => {
    if(err) throw err;
    console.log(rows);
    rows.forEach( (rows) => {
        console.log(`${rows.username} lives in ${rows.email}`);
      })
  });

  //DELETE query

  con.connect(function(err) {
    if (err) throw err;
    con.query("Delete * FROM users where id= ? ", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });


  //SERVE APLICATION PATH

const old = 'index/src'; 
app.get('*.*', express.static(old, {maxAge: '1y'}));

app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: old});
    
});

