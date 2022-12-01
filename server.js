var http = require('http');
var url = require('url');
var fs = require('fs');

let getSolution = function(query) {
    day = query.day.length > 1 ? "d" + query.day : "d0"+query.day
    let {p1,p2,t} = require(`./${day}/${day}`);
    return {p1 : p1, p2 : p2, t: t};
}


let handleRequest = function(req,res) {
    var q = url.parse(req.url,true);
    console.log(q.pathname)
    console.log(q.search)
    console.log(JSON.stringify(q))
    if (q.pathname == '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
    } else if (q.pathname == '/favicon.ico'){
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("<p>sorry</p>");
        return res.end();
    } else {

        res.writeHead(200, {'Content-Type': 'text/html'});
        let query = JSON.parse('{"' + q.search.replace(/&/g, '","').replace(/=/g,'":"').replace('?','') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        result = getSolution(query);
        res.write(`<html>
            <body>
            <h1>Advent of Code!</h1>
            <p>Day ${query.day}</p>
            <p>Result 1: ${result.p1}</p>
            <p>Result 2: ${result.p2}</p>
            <p>Time (ms): ${result.t}</p>
            </body>
            </html>`);
        return res.end();
    }
}

//create a server object:
http.createServer( (req,res) => handleRequest(req,res)).listen(8080); //the server object listens on port 8080