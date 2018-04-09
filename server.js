var http = require('http');
var path = require('path');
var mongoose = require("mongoose");
var express = require('express');
var parser = require('body-parser');


var companySingleRouter = require('./routes/company-single-router.js');
var companyListRouter = require('./routes/company-list-router.js');
var pricesAvgCloseValue = require('./routes/prices-avg-close-value.js')

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

companySingleRouter.defineRouting(app, mongoose, uristring);
companyListRouter.defineRouting(app, mongoose, uristring);
pricesAvgCloseValue.defineRouting(app, mongoose, uristring);

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});