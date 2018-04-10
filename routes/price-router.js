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
        
        app.route('/api/prices/:sym/avgclose')
            .get(function(req, resp){
            Price.find({name: req.params.sym}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { 
                    var dataArray = _.map(data)
                    var newArray = [];
                    for(var i = 0; i < 13; i++){
                        var monthArray = [];
                        var num = 0;
                        var total = 0;
                        var monthString = i;
                        if ( i < 10){monthString = '0'+ i}
                        for(var d in dataArray){
                            
                            if(d.date == new RegExp('-'+monthString+'-')) {
                                total = total + d.close;
                                num++;
                            }
                        }
                        monthArray.push([{"month": monthString, "average": total/num}])
                        newArray.push(monthArray);
                    }
                    resp.json(_.map(newArray))
                    }
            });
        });
    }
}