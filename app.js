
/*
var http = require('http');
var math = require('./math.js');
var server = http.createServer(function(req,res){
   res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!<br \>');
  res.write('My First node.js application');
  res.write(JSON.stringify(math.Add(2,8)));
  res.end();
});
server.listen(8080);

try {
var reqt = http.get('/calculator/add',function(req,res){
  var sum = math.Add(req.query.p,req.query.q);
  res.write(JSON.stringify(sum));
});

}
catch(e){
  
}
*/
var fs = require('fs');
var math = require('./math.js');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express(); 

//middlerware - the order of adding code for middleware is important
//if we add this code after the any end point then it will not log anything
var logger = function(req,res,next){
  console.log('Logging...');
  next();
}
app.use(logger);

//body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//index.html is always override over app.js
//middleware for static folder - css, image etc
app.use(express.static(path.join(__dirname,'public')));

//settings for EJS templating
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//app.set('views',path.join(__dirname,'partials'));


app.get('/',function(req,res){
    //res.send('Hello world !');
    //console.log(math.posts);
    //res.json(math.posts);
    res.render('index',{
      Title : 'Home',
      posts : math.posts
    });
});

app.get('/post/:id',function(req,res){
  const post = math.posts.filter((post) => {
    return post.id == req.params.id
  })[0]

  // render the `post.ejs` template with the post content
  res.render('post', {
    Title: post.title,
    author: post.author,
    title: post.title,
    body: post.body
  })
});

app.get('/addpost',function(req,res){
  res.render('addpost',{
    Title : 'Add Post'
  });
});

app.post('/addpost',function(req,res){
  //Console.log('Submitted' + req.body.author);

  math.posts.push({
    id: req.body.id,
    author: req.body.author,
    title: req.body.title,
    body: req.body.body
  });
  
  res.render('index',{
    Title : 'Add Post',
    posts : math.posts
  });
});

var port = process.env.PORT || 1337;
app.listen(port,function(){
  console.log('app started listening on port 8080');
});

app.get('/calculator/add',function(req,res){
  var sum = math.Add(Number.parseInt(req.query.p),Number.parseInt(req.query.q)); 
  res.send(JSON.stringify(sum));
});

app.get('/readfile',function(req,res){
  
});
