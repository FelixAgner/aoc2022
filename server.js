const http = require('http');
const url = require('url');
const fs = require('fs');
const {makeErrorPage} = require('./makeErrorPage');
const {makeTimePage} = require('./makeTimePage');

let getSolution = function(query) {
    let day = query >= 10 ? "d" + query : "d0"+query
    let {p1,p2,t} = require(`./${day}/${day}`);
    return {p1 : p1, p2 : p2, t: t};
}


let handleRequest = function(req,res) {
    var q = url.parse(req.url,true);
    console.log(`Request ${req.url} received.`)
    if (q.pathname == '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    } else if (q.pathname == '/times') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(makeTimePage());
        return res.end();
    } else if (q.pathname == '/problems') {
        let query = JSON.parse('{"' + q.search.replace(/&/g, '","').replace(/=/g,'":"').replace('?','') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        day = parseInt(query.day);
        if (isNaN(day)) {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(makeErrorPage("You must input a valid day!"))
            return res.end();
        } else if (day < 1 || day > 25) {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(makeErrorPage(`The advent calendar does not have ${day} days.`))
            return res.end(); 
        } else if (new Date(`December ${day}, 2022 06:00:00`) > new Date()){
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(makeErrorPage(`Day ${day} is not released yet!.`))
            return res.end(); 
        } else {

            try {
                result = getSolution(day);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(`<html>
                    <body>
                    <h1>Advent of Code!</h1>
                    <p>Day ${day}</p>
                    <p>Result 1: ${result.p1}</p>
                    <p>Result 2: ${result.p2}</p>
                    <p>Time (ms): ${result.t}</p>
                    </body>
                    </html>`);
                return res.end();
            } catch (error) {
            console.error(error);
                res.writeHead(404, {"Content-Type": "text/html"});
                res.write(makeErrorPage(`Sorry, I wasn't able to solve day ${day} yet :( `))
                return res.end(); 
            }

        }

    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write(makeErrorPage(`Sorry, I don't know what you want.`))
        return res.end(); 
    }

}

//create a server object:
http.createServer( (req,res) => handleRequest(req,res)).listen(8080); //the server object listens on port 8080