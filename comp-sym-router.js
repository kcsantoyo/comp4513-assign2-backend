var path = require('path');
module.exports = {
    
    defineRouting: function(app, comp)
    {
        app.route('/api/companies/:sym')
        .get(function(req, resp) {
            Comp.find({symbol : req.params.sym}, function(err, data) { 
                if (err) { resp.json({ message : 'Unable to find Companies' }); } 
                else { resp.json(data); }
            });
        });
    }
}