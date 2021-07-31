/**
 * Main (begin) Node JS page of the Data API, which will start the server (local temporarily)
 */
const http = require('http');// Using Node JS 'http' module
const requestHandler = require('./request-handler');// Require/import to use the handler file
const server = http.createServer(requestHandler);// Creates the server giving the handler actions to the createServer method

// Enables the server to listen requests in the local port 5000 (temporarily)
server.listen(5000, () => {
    console.log(
        "Server is enabled on http://localhost:5000/"
    );
});
