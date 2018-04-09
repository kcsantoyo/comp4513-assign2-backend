var path = require('path');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

module.exports = { 
    defineRouting: function(app, mongoose, uristring)
        {
            mongoose.connect(uristring, function (err, res) {
                if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
                else { console.log ('Succeeded connected to: ' + uristring); }
            });
            
            var schema = new mongoose.Schema ({
                date: String,
                open: Number,
                high: Number,
                low: Number,
                close: Number,
                volume: Number,
                name: Number,
            })
            
            var Price = mongoose.model('avgcloselist', schema);
            
            
            app.route('/api/prices/avgclose/:sym/:month')
                .get(function(req, resp) {
                var monthString = req.params.month
                if (req.params.month < 10) {monthString = '0' + req.params.month}
                Price.aggregate([
                    {$match: { name: 'AMZN', date:{ $regex: '-'+monthString+'-'} }},{$group: { _id: "$name", avg: { $avg: '$close'}}}
                    ]), function (err, result) {
                    if (err) {throw err} 
                    else { resp.json(result) }}   
            });
        }
}
