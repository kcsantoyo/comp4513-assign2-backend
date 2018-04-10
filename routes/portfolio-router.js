var path = require('path');
module.exports = {
    
    defineRouting: function(app, mongoose, uristring)
    {
        mongoose.connect(uristring, function (err, res) {
            if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
            else { console.log ('Succeeded connected to: ' + uristring); }
        });
        
        var portSchema = new mongoose.Schema({
            id: Number,
            symbol: String,
            name: String,
            sector: String,
            subind: String,
            addr: String,
            dteAdd: String,
            frqncy: Number
        });
    
        var Portfolio = mongoose.model('portfolios', portSchema);
        
        app.route('/api/portfolios/:user')
            .get(function(req, resp) {
            Portfolio.find({symbol : req.params.user}, function(err, data) { 
                if (err) { resp.json({ message : 'Unable to find Companies' }); } 
                else { resp.json(data); }
            });
        });
        
    }
}