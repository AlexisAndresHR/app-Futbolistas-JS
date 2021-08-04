/**
 * This file contains the actions to process the client (app) requests
 */
const url = require('url');// Using Node JS 'url' module
const stringDecoder = require('string_decoder').StringDecoder;// To use the 'string_decoder' module
const serverRouter = require('./server_router');// Require/import for the router file

/**
 * Arrow function for the request processing
 * @param req request object
 * @param res response object
 */
module.exports = (req, res) => {
    // Through the req object, the URL is obtained
    const navUrl = req.url;
    const parsedUrl = url.parse(navUrl, true);// Convert/parse the URL to get multiple data properties

    // Obtains the route (/something)
    const route = parsedUrl.pathname;
    // Removes the slash symbol of the route, using a JS regular expression
    const cleanedRoute = route.replace(/^\/+|\/+$/g, "");

    // Obtains the request method (GET, POST, PUT, DELETE)
    const requestMethod = req.method.toLowerCase();

    // * Gives CORS (Cross-Origin Resource Sharing) permissions to access the API
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Response to be send when the method is 'options'
    if (requestMethod === 'options') {
        res.writeHead(200);
        res.end();
        return;
    }


    // With a destructuring expression, obtains the data parameters in the URL
    const { urlParameters = {} } = parsedUrl;

    // Obtains the URL headers (detailed info)
    //const { urlHeaders = {} } = req;
    const urlHeaders = req.headers;// Object variable that contains the HTTP headers of the request

    // If exists, obtains the payload stream (to special actions in the data API)
    const decoder = new stringDecoder("utf-8");
    let buffer = "";

    // Cumulates the payload stream in a buffer var
    req.on("data", (data) => {
        buffer += decoder.write(data);
    });
    // When the payload stream ends, close the decoder process
    req.on("end", () => {
        buffer += decoder.end();

        if (urlHeaders["content-type"] === "application/json") {// Defines the content type (JSON) for the API response
            buffer = JSON.parse(buffer);
        }

        // Verifies if the URL has sub-routes to ...
        if (cleanedRoute.indexOf("/") > -1) {
            var [mainRoute, index] = cleanedRoute.split("/");
        }
        // Sorts the request data within an object
        const data = {
            index,
            route: mainRoute || cleanedRoute,
            urlParameters,
            requestMethod,
            urlHeaders,
            payload: buffer,
        };

        console.log({ data });

        // Selects the handler depending on the URL route, to assign it a function/route (server_router file)
        let handler;
        if (data.route && serverRouter[data.route] && serverRouter[data.route][requestMethod]) {
            handler = serverRouter[data.route][requestMethod];
        } else {
            handler = serverRouter.notFound;
        }
        console.log("handler", handler);

        // Executes the handler to give the response to the web navigator (according to the route)
        if (typeof handler === "function") {
            handler(data, (statusCode = 200, message) => {
                const response = JSON.stringify(message);
                res.setHeader("Content-Type", "application/json");// Defines the content type (JSON) for the API response
                res.writeHead(statusCode);
                // Line where the response is sent to the client app
                res.end(response);
            });
        }

    });

};
