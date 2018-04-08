var path = require('path');

module.exports = { 
    defineRouting: function(app, mongoose, uristring)
        {
            mongoose.connect(uristring, function (err, res) {
                if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
                else { console.log ('Succeeded connected to: ' + uristring); }
            });

            var schema = new mongoose.Schema({collection: 'prices'});
            var Price = mongoose.model('avgClosePrice', schema));

            app.route('/api/prices/:sym/avgclose')
                .get(function(req, resp) {
                Price.aggregate([
                    { $match: { name: "AAPL" }},
                    { $group: { _id: '$name', avg: {$avg: '$close'}}}], function(err) {
                    
                }
                    
                );
                });
        }
}