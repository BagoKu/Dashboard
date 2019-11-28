import axios from 'axios';
var https = require('http');
var request = require('request');

function addUser(_username, _email, _password) {
    const data = JSON.stringify({
        name: _username,
        email: _email,
        password: _password
    });

    const options = {
        hostname: 'localhost',
        port: 8800,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data)
    req.end()

}

async function findUser(_email, _password) {
    console.log("test2");
    const response = await axios.get(`http://localhost:8800`)
        .then(res => {
            console.log("test");
            for (var i = 0; res.data[i] != null; i++) {
                if (_email === res.data[i].email && _password === res.data[i].password) {
                    console.log("ok");
                    console.log(res.data[i].name);
                    return(res.data[i].name);
                } else
                    console.log("ko");
            }
            return("ko");
        })
        .catch(error => console.log(error))
    return("ko");
}

const user = {
    addUser, findUser
};

export default user;
