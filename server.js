const { response } = require('express');
var express = require('express'); //node.js exprees를 이용
var fs = require('fs'); //파일 읽기, 쓰기를 위한 node 내장 모듈 불러옴
var app = express()
var template = require('./template.js'); //js파일 읽기
var bodyParser = require('body-parser'); //미들웨어 body parser post request data의 body를 편리하게 추출해주는 기능

app.use(express.static('image')); //정적인 사진 사용
app.use(bodyParser.urlencoded({ extended: false })) //body parser 적용
var mysql = require('mysql'); //mysql 불러옴

var connection = mysql.createConnection({ //mysql 연결
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'user'
});
connection.connect();

//메인 화면
app.get('/', function (request, response) {
  var html = template.TIME();
  response.send(html);
});
//로그인 화면
app.get('/login', function (request, response) {
  var html = template.LOGIN();
  response.send(html);
});
//로그인 하고 난 화면       ********(세션 추가해서 로그아웃 기능 만들기)*********
app.post('/login_process',function(request,response){
  var username = request.body.username;
  var password = request.body.password;

  if(username && password){ //username password 다 입력했냐?
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
      if(results.length>=1){ //DB에 일치 하는 값이 있으면 실행

      }else{
        response.send('<script type="text/javascript">alert("일치하지 않습니다."); document.location.href="/login.html";</script>'); 
      }
    });
  }else{
    response.send('<script type="text/javascript">alert("ID와 PASSWORD를 다시 입력해주세요."); document.location.href="/login.html";</script>'); 
  }
});

//회원 가입 화면
app.get('/register', function (request, response) {
  var html = template.REGISTER();
  response.send(html);
});
//회원가입 데이터 보내고 후 화면
app.post('/register_process', function (request, response){
  var name = request.body.name;
  var username = request.body.username;
  var password = request.body.password;


  console.log(Boolean(name && username && password)); //다 입력했을 시 true
if(name && username && password){ //name username password 3개 다 입력했냐?
    connection.query('SELECT * FROM users WHERE name = ? AND username = ? AND password = ?', [name, username, password], function(error, results, fields){
      if (error) throw error; //에러 던지기
      console.log(results.length); //없으면 0이 나온다.
      if(results.length <=0){ //결과의 길이(개수)가 없을 때 실행 (일단 3개 중복 결과값 확인)
        connection.query('INSERT INTO users (name, username, password) VALUES(?,?,?)', [name, username, password],function (error, data) {
          if (error)
          console.log(error);
          else
          console.log(data);
        });
        response.send('<script type="text/javascript">alert("회원가입을 환영합니다!"); document.location.href="/";</script>');
      }else{ //일치 하는 정보가 있을 때
        response.send('<script type="text/javascript">alert("일치 하는 정보가 있습니다 다시 입력해주세요"); document.location.href="/register";</script>');
      };

  });
}else { //입력 안되어 있을 시 경고 메시지
  response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/register";</script>');    
  response.end();
};
});



app.listen(3000)