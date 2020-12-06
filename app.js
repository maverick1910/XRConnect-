var PORT= process.env.PORT || 3000
var express =require('express');
var mysql=require('mysql');
const app=express();
var bodyparser=require("body-parser")



//APP CONFIG
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/img', express.static('public/img'));
app.use('*/fonts', express.static('public/fonts'));
app.use('*/vendors', express.static('public/vendors'));

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

app.get('/',function(req,res){
  res.render('index');

});
app.get('/register',function(req,res){
  res.render('register');

});
app.post('/admin',function(req,res){
  res.render('admin')
})
app.get('/join',function(req,res){
  res.render('join')
})

app.listen(PORT,console.log('server up'));