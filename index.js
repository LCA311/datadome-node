const http = require('https')
const api = require('./apiModule')

let server = http.createServer()
let jsonList = []

api(jsonList, () => {
    console.log("Finished synchronisation")
    server.listen(443, "0.0.0.0")
})

server.on('request', (request, response) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(jsonList))
    response.end();
})
