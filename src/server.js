/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require("http");
var fs = require("fs");
var port = 3000;

var server = http.createServer(function (req, res) {
    if (req.url === "/") {
        fs.readFile("src/index.html", function (err, data) {
            if(err) throw err;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, {"content-type": "text/html;charset=UTF8"});
            console.log("one client opened the index page");
            res.end(data);
        });
    } else if (req.url === "/logdate" && req.method.toLowerCase() === "post") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {"content-type": "text/plain;charset=UTF8"});
        let currentDate = new Date();

        let dateString = (currentDate.getMonth() + 1) + "/" +
                currentDate.getDate() + "/" +
                currentDate.getFullYear() + "-" +
                currentDate.getHours() + ":" +
                currentDate.getMinutes() + ":" +
                currentDate.getSeconds() + ":" +
                currentDate.getMilliseconds();

        addDateLog(dateString+"\n");
        console.log("The server received an HTTP "+req.method+" request"+
                " and successfully write current date("+dateString+") in to the datelog.txt");
        res.end();
    } else if (req.url === "/dates" && req.method.toLowerCase() === "get") {
        fs.readFile("datelog.txt",function (err, data) {
            if(err){ 
                res.writeHeader(404,{'content-type' : 'text/plain;charset=UTF8'});
                console.log("Where is my file? I can't find my file!");
                res.end();
            }else{
                console.log("The server received an HTTP "+req.method+" request"+" and I bet you have seen what you want to see");
                data = data.toString().replace(/\n/g,"<br/>");
                res.writeHead(200, {"Content-type": "text/plain;charset=UTF8"});
                res.end(data);
            }
        });
    } else if (req.url === "/client.js") {
        fs.readFile("src/client.js", function (err, data) {
            if(err) throw err;
            res.writeHead(200, {"Content-type": "text/javascript;charset=UTF8"});
            res.end(data);
        });
    } else {
        res.writeHead(404, {"Content-Type": "text/html;charset=UTF8"});
        res.end("check your url");
    }
});

function addDateLog(data)
{
    fs.appendFileSync("datelog.txt",data,err=>{
        if(err) throw err;
    });
}

server.listen(port, () => console.log(`Server on: 127.0.0.1:${port}!`));

