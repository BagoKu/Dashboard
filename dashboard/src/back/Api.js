var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

/*var hostname = 'localhost'*/
var port = 8800


var options = { server: { socketOptions: { keepAlice: 300000, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}};

var urlmongo = "mongodb://mongo:27017/mydb";

mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connection'));
db.once('open', function() {
    console.log("Connection ok");
});

var app = express();

app.use(cors());

var myRouter = express.Router();

var widgetSchema = mongoose.Schema({
    name: String,
    type: String
})

var Widgets = mongoose.model('Widgets', widgetSchema);

var dashboardSchema = mongoose.Schema({
    name: String,
    icon: String,
    widgets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Widgets',
        //required: false
    }]
})

var Dashboards = mongoose.model('Dashboards', dashboardSchema);

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dashboards: [{
        name: String,
        icon: String,
        widgets: [{
            name: String,
            type: String,
        }]
        //required: false
    }]
})

var User = mongoose.model('User', userSchema);

myRouter.route('/')
    .get(function(req, res) {
        User.find(function(err, users) {
            if(err) {
                res.send(err);
            }
            res.json(users);
        });
    })
    .post(function(req, res) {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        //user.set({ dashboards: req.body.dashboards });
        user.dashboards = req.body.dashboards;
        user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message : 'New User is now in your db'});
        });
    })
    .put(function(req, res) {
        User.findOne({email: req.body.email}, function (err, usr) {
            if (err){
                res.send(err);
            }
            if(usr && req.body.dashboards) {
                usr.dashboards.push(req.body.dashboards)
            }
            if (usr && req.body.widgets) {
                usr.findOne({dashboards: req.body.dashName}, function (err, dash) {
                    dash.widgets.push(req.body.widgets)
                })
            }
            usr.save(function (err, updatedUser) {
                if (err)
                    return res.json({ success: false, msg: 'Une erreur est survenue, veuillez réessayer' });
                res.json({ success: true, msg: 'User updated' });
            });
        })
    })
    .delete(function(req, res) {

    });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(myRouter);

module.exports = User;

/*app.listen(port, hostname, function() {
    console.log("mon serveur fonctionne sur http://" + hostname + ":" + port + "\n");
});*/
app.listen(port, () => console.log("mon serveur est sur le port : " + port));
