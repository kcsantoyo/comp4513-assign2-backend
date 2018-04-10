var path = require('path');
var bodyParser = require('body-parser');
var md5 = require('../node_modules/crypto-md5/md5');

module.exports = {
    
    defineRouting: function(app, mongoose, uristring) 
    {
        mongoose.connect(uristring, function (err, res) {
            if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
            else { console.log ('Succeeded connected to: ' + uristring); }
        });
        
        var userSchema = new mongoose.Schema({
            first_name: String,
            last_name: String,
            email: String,
            salt: String,
            password: String
        });
        
        var User = mongoose.model('users', userSchema);
        
        app.route('/api/users')
            .get(function(req, resp){
            User.find({}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find users' }); } 
                else { resp.json(data); }
            });
        });
        
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }));
        
        app.post('/api/login', function(req, resp){
            var user = req.body.email;
            var password = req.body.password;
            
            User.find({email: user}, function(err, data) {
                if (md5(password + data.salt, 'hex') == data.password){
                    resp.send(true)
                }
                else { resp.send(false) }
            })
        })
    }
}