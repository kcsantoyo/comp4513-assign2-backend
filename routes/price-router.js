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
            var monthString = req.params.mnth;
            if (monthString < 10){monthString = '0' + req.params.mnth}
            Price.find({name : req.params.sym, date : new RegExp('-'+monthString+'-')}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { resp.json(data); }
            });
        });
        
        app.route('/api/prices/:sym/')
            .get(function(req, resp) {
            Price.find({name: req.params.sym}, function(err, data){
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { resp.json(data); }
            })
        });
        
    }
}