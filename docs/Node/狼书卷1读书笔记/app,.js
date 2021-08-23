const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/plain',
  })
  res.end('Hello node.js')
}).listen(3000)

console.log('Server Running at http://127.0.0.1:3000')
