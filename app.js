var express =require('express');
var mysql=require('mysql');
const app=express();

var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'reinvi_xrcore',
   
});


app.get('/rows', function (req, res) {
  conn.connect();  

  conn.query('SELECT * FROM auth_user', function(err, rows, fields)   
  {  
      conn.end();

      if (err) throw err;  

      res.json(rows); 

  });
});

app.listen(3000,console.log('server up'));