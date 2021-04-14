const http = require('http');
require('dotenv').config()
const port = process.env.PORT
const app = require('./app');
const server = http.createServer(app);

server.listen(port, function() {
    console.log('Server listening on port ' + port);
});
