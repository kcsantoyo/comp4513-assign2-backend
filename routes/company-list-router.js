var path = require('path');

module.exports = { 
    defineRouting: function(app, mongoose, uristring)
        {
            mongoose.connect(uristring, function (err, res) {
                if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
                else { console.log ('Succeeded connected to: ' + uristring); }
            });

            var Comp = mongoose.model('companies', new Schema({symbol: String,
                                                               name: String}));

            app.route('/api/companies/')
                .get(function(req, resp) {
                Comp.find({}, function(err, data) { 
                    if (err) { resp.json({ message : 'Unable to find Companies' }); } 
                    else { resp.json(data); }
                });
            });
        }
}