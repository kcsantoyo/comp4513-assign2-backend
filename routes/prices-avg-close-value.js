var path = require('path');
var _ = require('lodash')

module.exports = { 
    defineRouting: function(app, mongoose, uristring)
        {
            mongoose.connect(uristring, function (err, res) {
                if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
                else { console.log ('Succeeded connected to: ' + uristring); }
            });

            var schema = new mongoose.Schema({date: String, open: Number, high: Number, low: Number, close: Number, volume: Number, Name: String}, {collection: 'prices'});
            var Price = mongoose.model('avgClosePrice', schema);

            app.route('/api/prices/avgclose/:sym')
                .get(function(req, resp) {
                Price.find({ name: req.params.sym}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { 
                        var priceData = _.map(data);
                        for(var price in priceData){
                            price.date = price.date.split(date, "-");                        }

                    resp.json(priceData); 
                     
                     }})  
            }
                );
        }
}
