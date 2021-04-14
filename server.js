const http = require('http');
const port = process.env.port || 3000;
const app = require('./app');
const server = http.createServer(app);

server.listen(port, function() {
    console.log('Server listening on port ' + port);
});
