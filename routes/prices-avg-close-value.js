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
            
            var getAvgClosePrice = function(symbol, monthString){
                return Price.aggregate([
                    {$match: { name: symbol, date:{$regex: '-'+monthString+'-'} }},
                    {$group: { _id: "$name", avg: { $avg: '$close'}}}
                ])
            }
            
            
            app.route('/api/prices/avgclose/:sym/')
                .get(function(req, resp) {
                    Price.find({}, function(err, data) {
                            var obj = [];
                            for(var i = 1; i < 13; i++){
                                var monthString = i;
                                if (i < 10) {monthString = '0'+ i}
                                obj.push(getAvgClosePrice(req.param.sym, monthString))
                            }
                            resp.json(obj)}
                        });
        }
}
