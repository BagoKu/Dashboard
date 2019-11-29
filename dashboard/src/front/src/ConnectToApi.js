import axios from 'axios';
import Cookies from "js-cookie";
var https = require('http');
var request = require('request');
const process = require('process');



var port = 8800

async function addUser(_username, _email, _password) {
    const data = JSON.stringify({
        name: _username,
        email: _email,
        password: _password,
        widgets: [{
            dashName: "first_connection"
        }],
        dashboards: [{
            name: "Home",
            icon: "oui"
        }]
    });

    const options = {
        hostname: 'localhost',
        port: port,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        /*res.on('data', (d) => {
            process.stdout.write(d)
        })*/
    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data)
    req.end()

    Cookies.set('_password', _password);
    Cookies.set('_email', _email);

}

function addWidget(_email, _dashboard, _widgetName, _widgetType) {
    const data = JSON.stringify({
        email: _email,
        widgets: [{
            dashName: _dashboard,
            name: _widgetName,
            type: _widgetType
        }]
    });

    const options = {
        hostname: 'localhost',
        port: port,
        path: '/',
        method: 'PUT',
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

function addDashboard(_email, _dashboardName, _icon) {

    const data = JSON.stringify({
        email: _email,
        dashboards: {
            name: _dashboardName,
            icon: _icon.type.displayName
        }
    });

    console.log(_icon.type.displayName);

    const options = {
        hostname: 'localhost',
        port: port,
        path: '/',
        method: 'PUT',
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

async function findUser(_email, _password) {
    console.log("test2");
    const response = await axios.get(`http://localhost:` + port)
        .then(res => {
            console.log("test");
            for (var i = 0; res.data[i] != null; i++) {
                if (_email === res.data[i].email && _password === res.data[i].password) {
                    console.log("ok");
                    console.log(res.data[i].name);
                    return(res.data[i].email);
                } else
                    console.log("ko");
            }
            return("ko");
        })
        .catch(error => console.log(error))
    return(response);
}

async function loadDashboards(_email, _password) {
    const response = await axios.get(`http://localhost:` + port)
        .then(res => {
            console.log("test");
            for (var i = 0; res.data[i] != null; i++) {
                if (_email === res.data[i].email && _password === res.data[i].password) {
                    console.log("ok");
                    console.log(res.data[i].name);
                    return(res.data[i].dashboards);
                } else
                    console.log("ko");
            }
            return("ko");
        })
        .catch(error => console.log(error))
    return(response);
}

const user = {
    addUser, findUser, addDashboard, addWidget
};

export default user;
