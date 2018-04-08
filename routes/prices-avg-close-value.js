var path = require('path');

module.exports = { 
    defineRouting: function(app, mongoose, uristring)
        {
            mongoose.connect(uristring, function (err, res) {
                if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
                else { console.log ('Succeeded connected to: ' + uristring); }
            });

            var schema = new mongoose.Schema({symbol: String, name: String});
            var Comp = mongoose.model('avgClosePrice', 
                                      new mongoose.Schema({collection: 'prices'}));

            app.route('/api/prices/:sym/close')
                .get(function(req, resp) {
                Comp.find({name: req.params.sym}, function(err, data) { 
                    if (err) { resp.json({ message : 'Unable to find Companies' }); } 
                    else { resp.json(data); }
                });
            });
        }
}