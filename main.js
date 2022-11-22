var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    //pathname만 알려 준다.
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData);
    // console.log("url",_url);

    if(request.url == '/'){
      _url = '/time.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    //파일을 가져오는 정적인 방법
    response.end(fs.readFileSync(__dirname + _url));
 
});
app.listen(3000);