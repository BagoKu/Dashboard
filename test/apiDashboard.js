var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var hostname = 'localhost'
var port = 3000

var options = { server: { socketOptions: { keepAlice: 300000, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}};

var urlmongo = "mongodb://localhost:27017/mydb";

mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in connection'));
db.once('open', function() {
    console.log("Connection ok");
})

var app = express()

var myRouter = express.Router();

var userSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    username: String,
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
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.username = req.body.email;
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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(myRouter);

module.exports = User;

app.listen(port, hostname, function() {
    console.log("mon serveur fonctionne sur http://" + hostname + ":" + port + "\n");
});
