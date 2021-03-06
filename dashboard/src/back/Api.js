var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

/*var hostname = 'localhost'*/
var port = 8800


var options = { server: { socketOptions: { keepAlice: 300000, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}};

var urlmongo = "mongodb://mongo:27017/db_dashboard";

mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connection'));
db.once('open', function() {
    console.log("Connection ok");
});

var app = express();

app.use(cors());

var myRouter = express.Router();


var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dashboards: [{
        _type: String,
        _link: String,
        _name: String,
        _icon: String,
        _data: String,
    }]
});

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
        let user = new User();

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.dashboards = req.body.dashboards;
        user.save(function (err) {
            if (err)
                res.send(err);
            res.send({success: true, msg: 'New User is now in your db'});
        });
    })
    .put(function(req, res) {
        User.findOne({email: req.body.email}, function (err, usr) {
            if (err){
                res.send(err);
            }
            if (usr && req.body.dashboards) {
                usr.dashboards.push(req.body.dashboards)
            }
            if (usr && req.body.nameToRemove && req.body.typeToRemove) {
                for (let i = 0; usr.dashboards[i]; i++) {
                    if ((usr.dashboards[i]._name === req.body.nameToRemove
                        && usr.dashboards[i]._type === req.body.typeToRemove) ||
                    usr.dashboards[i]._link === req.body.nameToRemove) {
                        usr.dashboards.splice(i, 1);
                        i--;
                    }
                }
            }
            usr.save(function (err) {
                if (err)
                    res.send(err);
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

app.listen(port, () => console.log("mon serveur est sur le port : " + port));
