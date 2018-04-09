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
            
            var Price = mongoose.model('monthlycloseprices', schema);
            
            var getAvgClosePrice = function(symbol, monthString, resp){
                
                    Price.find({ name: 'AMZN', date: new RegExp('-'+monthString+'-')}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { return data }});
                
                
            }
            
            
            app.route('/api/prices/avgclose/:sym/')
                .get(function(req, resp) {
                            var obj = []
                            for(var i = 1; i < 13; i++){
                                var monthString = i;
                                if (i < 10) {monthString = '0'+ i}
                                obj.push(getAvgClosePrice(req.param.sym, monthString, resp));
                            }
                            resp.json(obj);
            });
        }
}
