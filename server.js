var http = require('http');
var path = require('path');
var mongoose = require("mongoose");
var express = require('express');
var parser = require('body-parser');

var company = require('./routes/company-router.js');
var user = require('./routes/user-router.js');
var price = require('./routes/price-router.js')
var portfolio = require('./routes/portfolio-router.js');

var uristring = 
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.MONGODB_URI ||
    'mongodb://localhost/HelloMongoose';

var theport = process.env.PORT || 5000;
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

company.defineRouting(app, mongoose, uristring);
user.defineRouting(app, mongoose, uristring);
price.defineRouting(app, mongoose, uristring);
portfolio.defineRouting(app, mongoose, uristring); 

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});