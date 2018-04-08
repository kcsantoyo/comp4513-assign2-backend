var mongoose = require('./mongoose');
var express = require('express');
var parser = require('body-parser');

mongoose.connect('mongodb://admin:admin123456@ds239009.mlab.com:39009/heroku_h7v600xh');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("connected to mongo");
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

var Comp = mongoose.model('Comp', compSchema);
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