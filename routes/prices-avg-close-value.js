var path = require('path');

module.exports = { 
    defineRouting: function(app, mongoose, uristring)
        {
            mongoose.connect(uristring, function (err, res) {
                if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
                else { console.log ('Succeeded connected to: ' + uristring); }
            });

            var schema = new mongoose.Schema({symbol: String, name: String});
            var Price = mongoose.model('avgClosePrice', 
                                      new mongoose.Schema({
                name: String}));

            app.route('/api/prices/:sym/avgclose')
                .get(function(req, resp) {
                Price.aggregate([{$group: {
                                    "name": req.params.sym,
                                    "avg": {$avg: "close"}
                                }}]);
                });
        }
}