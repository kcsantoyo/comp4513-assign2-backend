var path = require('path');
var _ = require('lodash')
module.exports = {
    
    defineRouting: function(app, mongoose, uristring) 
    {
        mongoose.connect(uristring, function (err, res) {
            if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
            else { console.log ('Succeeded connected to: ' + uristring); }
        });
        
        var priceSchema = new mongoose.Schema({
            id: Number,
            date: String,
            open: Number,
            high: Number,
            low: Number,
            close: Number,
            volume: Number,
            name: String
        });
        
        var Price = mongoose.model('prices', priceSchema);
        
        app.route('/api/prices/:sym/:mnth')
            .get(function(req, resp){
            Price.find({name : req.params.sym, date : new RegExp(req.params.mnth)}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { resp.json(data); }
            });
        });
        
        app.route('/api/prices/:sym/:date')
            .get(function(req, resp) {
            Price.find({name: req.params.sym, date: req.params.date}, function(err, data){
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { resp.json(data); }
            })
        });
        
        var getMonthlyAverage = function(symbol, monthString) {
            Price.aggregate([{$match: {symbol: symbol, date: {$regex: '-'+monthString+'-'}}},
                             {$group: {avg: {$avg: "$close"}}
                             }], function(err, data) {
                if(err) {throw err}
                else{return data;}
            });
        }
        
        app.route('/api/prices/:sym/avgclose')
            .get(function(req, resp){
                var obj = [];
                for(var i = 1; i < 13; i++) {
                    var monthString = i;
                    if(i < 10){monthString = '0'+i}
                    var result = getMonthlyAverage(req.params.sym, monthString);
                    obj.push(result)
                }
                resp.json(_.map(obj));
            });
    }
}