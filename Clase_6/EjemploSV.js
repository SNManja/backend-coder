let http = require('http');

const server = http.createServer((request,response) => {
    response.end("mi primer hola mundo")

})

server.listen(8080, () => {
    console.log("server run on port: 8080")
})