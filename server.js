var http = require('http');
var mongoose = require("mongoose");
var express = require('express');
var parser = require('body-parser');

var uristring = 
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.MONGODB_URI ||
    'mongodb://localhost/HelloMongoose';

var theport = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

var compSchema = new mongoose.Schema({
    id: Number,
    symbol: String,
    name: String,
    sector: String,
    subind: String,
    addr: String,
    dteAdd: String,
    frqncy: Number
});

var Comp = mongoose.model('companies', compSchema);
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.route('/api/companies/:sym')
    .get(function(req, resp) {
    Comp.find({symbol : req.params.sym}, function(err, data) {
        if (err) { resp.json({ message : 'Unable to find Companies' }); }
        else { resp.json(data); }
    });
});

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});