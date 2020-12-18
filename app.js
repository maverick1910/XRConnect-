var PORT= process.env.PORT || 3000
var express =require('express');
var mysql=require('mysql');
const app=express();
var bodyparser=require("body-parser");
const jwt=require('jsonwebtoken');
const bc=require('bcryptjs');



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



app.get('/',function(req,res){
  res.render('index');

});
app.get('/register',function(req,res){
  res.render('register');

});
app.post('/',async function(req,res){
  
  try{
    var email= await req.body.email;
    var pass= await req.body.pass;

    conn.query('SELECT * FROM auth1 WHERE email = ? ',[email],async(error,result)=>{
      console.log(result);
      if(error){
        console.log(err);
      }
      if( result.length==0 || !(await bc.compare(pass,result[0].pass))){
        res.status(401).render('index',console.log('Email or Password Incorrect'));
      }
      else{
        res.redirect('admin');
      }
    });
  }
  catch(error){
    console.log(error);
  }
  
});



app.post('/register',function(req,res){
  
  var fname=req.body.fname;
  var lname=req.body.lname;
  var uname=req.body.uname;
  var email=req.body.email;
  var pass=req.body.pass;
  var re_pass=req.body.re_pass;
  conn.query('SELECT email FROM auth1 WHERE email=?',[email],async(error,result)=>{
    if(error){
      console.log(error);
    }
    if(result > 0){
     return res.render('register',console.log('email exists'));
    }
    else if(pass !== re_pass){
      return res.render('register',console.log('pass no match'));  
    }
    let hsp=await bc.hash(pass,8);
    console.log(hsp);
    conn.query('INSERT INTO auth1 SET ?',{first_name:fname,last_name:lname,email:email,password:hsp,user_name:uname},(error,result)=>{
      if(error){
        console.log(error);
      }
      else{
        console.log(result);
       return res.render('register',console.log('user registered'));
      }
    });
  });

  
});

app.post('/admin',function(req,res){
  res.render('admin')
});
app.get('/join',function(req,res){
  
  let sql="SELECT * FROM sessions";
  let query=conn.query(sql,(err,rows)=>{
    if(err)throw err;
    res.render('join',{
      title:' Join Meeting',
      user:rows
    });
  });
  
  
});
app.get('/join/:id',function(req,res){
  
})


app.listen(PORT,console.log('server up'));