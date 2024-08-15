//Import express, http and wisp
import http from 'node:http';
import express from 'express';
import wisp from 'wisp-server-node';

//create the express "app"
const app = express();
//create an http server
const httpServer = http.createServer();
//define the port to listen on
//change this to your liking!
const port = 8080;

//basic hello world. We will change this later!
app.get('/', (req, res) => {
    //send a response of hello world!
    res.send('Hello World!');
});

//listen for requests on the http server.
httpServer.on('request', (req, res) => {
    //make express handle all of the requests
    app(req, res)
});

//listen for websocket upgrades on the http server
httpServer.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        //route the request to the wisp server if the url ends in /wisp/
        wisp.routeRequest(req, socket, head);
    }
    else {
        socket.end();
    }
});

//when the server is ready, console.log that it is ready
httpServer.on('listening', () => {
    console.log(`Server listening on http://localhost:${port}`);
});

//start the http server
httpServer.listen({
    port: port 
});
