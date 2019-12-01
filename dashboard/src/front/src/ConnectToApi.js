import axios from 'axios';
import Cookies from "js-cookie";
var https = require('http');
var request = require('request');
const process = require('process');
const crypto = require('crypto');

var port = 8800;

async function addUser(_username, _email, _password) {
    const data = JSON.stringify({
        name: _username,
        email: _email,
        password: crypto.pbkdf2Sync(_password, 'alcoholiswater', 100000, 64, 'sha512').toString('hex'),
        dashboards: [{
            _type: "dashboard",
            _name: "Home",
            _icon: "oui"
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
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.write(data);
    req.end();

    Cookies.set('_password', crypto.pbkdf2Sync(_password, 'alcoholiswater', 100000, 64, 'sha512').toString('hex'));
    Cookies.set('_email', _email);

}

function addWidget(_email, _dashboard, _widgetName, _widgetType) {
    const data = JSON.stringify({
        email: _email,
        dashboards: {
            _type: "widget",
            _link: _dashboard.name,
            _name: _widgetName,
            _data: _widgetType
        }
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
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.write(data);
    req.end()
}

function addDashboard(_email, _dashboardName, _icon)
{
    const data = JSON.stringify({
        email: _email,
        dashboards: {
            _type: "dashboard",
            _name: _dashboardName,
            _icon: _icon.type.displayName
        }
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
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.write(data);
    req.end()
}

async function findUser(_email, _password) {
    const response = await axios.get(`http://localhost:` + port)
        .then(res => {
            for (var i = 0; res.data[i] != null; i++) {
                if (_email === res.data[i].email &&
                    crypto.pbkdf2Sync(_password, 'alcoholiswater', 100000, 64, 'sha512').toString('hex') === res.data[i].password) {
                    return (res.data[i].email);
                }
            }
            return("ko");
        })
        .catch(error => console.log(error));
    return(response);
}

async function getBDD() {
    const response = await axios.get(`http://localhost:` + port);
    return(response);
}

async function loadDashboards(_email, _password) {
    const response = await axios.get(`http://localhost:` + port)
        .then(res => {
            for (var i = 0; res.data[i] != null; i++) {
                if (_email === res.data[i].email) {
                    return (res.data[i].dashboards);
                }
            }
            return("ko2");
        })
        .catch(error => console.log(error))
    return(response);
}

function deleteData(_email, _dashName, _type) {
    const data = JSON.stringify({
        email: _email,
        typeToRemove: _type,
        nameToRemove: _dashName,
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
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.write(data);
    req.end()

}

const user = {
    addUser, findUser, addDashboard, addWidget, loadDashboards, deleteData, getBDD
};

export default user;
