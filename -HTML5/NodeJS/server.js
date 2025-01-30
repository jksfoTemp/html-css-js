var http = require("http");

/* 
// simple & synchronous (bad): 
http.createServer(function(request, response) {
   response.writeHead(200, {"Content-Type": "text/plain"}); 
   response.write("Hello0");
   response.end();
}).listen(8888);
*/

// refactored & asynchronous (good): 
function onRequest(request, response) {
  console.log("Request received"); 
  response.writeHead(200, {"Content-Type": "text/plain"}); 
  response.write("Hello3");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server Started"); 


