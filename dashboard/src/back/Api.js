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

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
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
        user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.send({message : 'New User is now in your db'});
        });
    })
    .put(function(req, res) {

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
