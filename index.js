const https = require('http')
const api = require('./apiModule')

let server = https.createServer()
let jsonList = []

api(jsonList, () => {
    console.log("Finished synchronisation")
    server.listen(process.env.PORT || 8080)
})

server.on('request', (request, response) => {
    console.log('new request')
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(jsonList))
    response.end();
})
