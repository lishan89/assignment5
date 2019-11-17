var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support url encoded bodies

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8998);

app.get('/',function(req,res){
  var context = {};
  context.type = 'GET';
  context.urlParams = [];

  for(var param in req.query){
    context.urlParams.push({'name':param, 'value':req.query[param]});
  }

  if (context.urlParams.length > 0) {  //if has url params
    context.hasUrl = true;
  } else {
    context.hasUrl = false;
  }

  res.render('home', context);
});

app.post('/',function(req,res){
  var context = {};
  context.type = 'POST';
  context.urlParams = [];
  context.bodyParams = [];
  for(var param in req.query){
    context.urlParams.push({'name':param, 'value':req.query[param]});
  }

  for(var param in req.body){
    context.bodyParams.push({'name':param, 'value':req.body[param]});
  }

  if (context.bodyParams.length > 0) {  //if has body params
    context.hasBody = true;
  } else {
    context.hasBody = false;
  }

  if (context.urlParams.length > 0) {  //if has url params
    context.hasUrl = true;
  } else {
    context.hasUrl = false;
  }

  res.render('home', context);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
