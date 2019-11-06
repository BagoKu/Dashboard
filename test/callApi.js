var https = require('http');
var request = require('request');


const data = JSON.stringify({
    name: "Joe",
    surname: "Lapine",
    email: "joelapine@gmail.com",
    username: "joejoe",
    password: "michel"
})


const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
        process.stdout.write(d)
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.write(data)
req.end()
