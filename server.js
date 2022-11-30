const { response } = require('express');
var express = require('express'); //node.js exprees를 이용
var fs = require('fs'); //파일 읽기, 쓰기를 위한 node 내장 모듈 불러옴
var app = express()
var template = require('./template.js'); //js파일 읽기
var bodyParser = require('body-parser'); //미들웨어 body parser post request data의 body를 편리하게 추출해주는 기능
var mysql = require('mysql'); //mysql 불러옴
var session = require('express-session'); //session
var MySQLStore = require('express-mysql-session')(session); //세션값을 mysql에 저장

app.use(express.static('image')); //정적인 폴더 (사진) 사용
app.use(express.static("main"));//정적인 폴더(main화면) 사용 다시 만져보기 ************************************
app.use(bodyParser.urlencoded({ extended: false })) //body parser 적용 세션아이디를 접속할떄마다 발급하지 않는다.
app.use(session({
  secret: 'oh',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'user'
    }), //파일로 저장하겠다.
  cookie: {
    maxAge: 600000 //10분
  },
  rolling: true
}));

//mysql 연결
var connection = mysql.createConnection({ 
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'user'
});
connection.connect();

//첫 화면
app.get('/', function (request, response) {
  //로그인 되어있으면 login logout 바꿔줌
  if(request.session.isLogined == true){
    var body ='';
    body = `
    <a id="enterLogin" href="/logout">Logout</a>
    `
    var html = template.TIME(body);
    response.send(html);
  }else{
    var body = '';
    body =`
    <a id="enterLogin" href="/login">Login</a>
    `;
    var html = template.TIME(body);
    response.send(html);
  }
});

//메인 화면
app.get('/main', function (request, response) {
  // //로그인 되어있으면 login logout 바꿔줌
  if(request.session.isLogined == true){
    var body = '';
    body = `
    <li><a href="/logout">Logout</a></li>
    `;
    var html = template.MAIN(body);
    response.send(html);
  }else{
    response.send('<script type="text/javascript">alert("먼저 로그인을 해주세요"); document.location.href="/login";</script>'); 
  }

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
        request.session.isLogined = true; //세션 isLogined 에 true 줘서 로그인 했다 알리기
        var sse = request.session.user
        sse = username;
        console.log(sse);
        response.send('<script type="text/javascript">alert("안녕하세요"); document.location.href="/main";</script>'); 
      }else{
        response.send('<script type="text/javascript">alert("일치하지 않습니다."); document.location.href="/login";</script>'); 
        // res.redirect('/login');
      }
    });
  }else{
    response.send('<script type="text/javascript">alert("ID와 PASSWORD를 다시 입력해주세요."); document.location.href="/login";</script>'); 
  }
});
//로그아웃  세션 삭제
app.get('/logout', function (request, response) {
  if(request.session.isLogined){  //로그인이 되어있는 상태냐
    request.session.destroy(function(err){
        if(err) throw err;
        response.send('<script type="text/javascript">alert("로그아웃 되었습니다."); document.location.href="/";</script>');
    });
  }
  else{
    response.send('<script type="text/javascript">alert("현재 로그인 상태가 아닙니다. 로그인 해주세요."); document.location.href="/";</script>');
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
  // response.end();
};
//나중에 404에러 처리하기
});

app.listen(3000,function(){
 console.log('서버 가동 중');
});