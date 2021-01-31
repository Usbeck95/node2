"use strict";

const http = require("http");
const httpStatus = require("http-status-codes");
const hostname = "127.0.0.1";
const port = 3000;
const app = http.createServer();            // server as an obj

const getJSONString = function (obj) {      // prettyprint obj
    return JSON.stringify(obj, null, 4);
}

app.on("request", function (req, res) {     // eventhandler for "request"
    let body = [];
    req.on("data", function (bodyData) {    // eventhandling for data reception
        body.push(bodyData);                // bodyData is an object
    });
    req.on("end", function () {             // eventhandling for end-of-data
        body = Buffer.concat(body).toString();
        console.log("Log: Request Body Contents: " + body);
    });

    console.log("Log: Method: " + req.method);
    console.log("Log: URL: " + getJSONString(req.url));
    console.log("Log: Headers:\n" + getJSONString(req.headers));
                                            // prep response header
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html; charset=utf-8"
    });
                                            // prep response body
    let responseMsg = "<h1>Kilroy Was Here Too</h1>";
    responseMsg += "<p><kbd>myg53</kbd> is helping him</p>";
    res.write(responseMsg);                 // respond
    res.end();                              // sends response http
});

app.listen(port, hostname, function () {
    console.log(`Server running, and listening at http://${hostname}:${port}/`);
});