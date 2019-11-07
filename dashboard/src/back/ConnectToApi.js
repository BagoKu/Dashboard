//import axios from 'axios'
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
        port: 3002,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

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

function findUser(_email, _password) {
    const options = {
        hostname: 'localhost',
        port: 3002,
        path: '/',
        method: 'GET'
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()

    /*    axios({
            url: 'https://localhost:3002',
            method: 'get'
        }).then(response => console.log("REUSSI: ", response))
        .error(error => console.log("ERROR ", error))*/
}

const user = {
    addUser, findUser
}

export default user;
