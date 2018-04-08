var path = require('path');
module.exports = {
    
    defineRouting: function(app, mongoose, uristring)
    {
        mongoose.connect(uristring, function (err, res) {
            if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
            else { console.log ('Succeeded connected to: ' + uristring); }
        });
        
        //var compSchema = new mongoose.Schema({
            //id: Number,
            //symbol: String,
            //name: String,
            //sector: String,
            //subind: String,
            //addr: String,
            //dteAdd: String,
          //  frqncy: Number
        //});
        
        var Comp = mongoose.model('companies');
        
        app.route('/api/companies/:sym')
            .get(function(req, resp) {
            Comp.find(function(err, data) { 
                if (err) { resp.json({ message : 'Unable to find Companies' }); } 
                else { resp.json(data); }
            });
        });
    }
}