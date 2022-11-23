module.exports = {
    TIME: function () {
        return `
        <!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet">
    <title>Home</title>
    <style>
        *{
            margin: 0px;
            padding: 0px;
        }
        body{
            /* position: relative; */
            width: 100%;
            height: 600px;
            background-image: url(background.jpg);
        }
        #clock{
            position: relative;
            margin-top: 18%;
            font-family: 'Jua', sans-serif;
            color: #fff;
        }
        .time{
            /* position: absolute; */
            top: 300px;
            left: 32%;
            font-size: 150px;
            text-align: center;

        }
        .date{
            /* position: absolute; */
            top: 450px;
            left: 40%;
            font-size: 30px;
            text-align: center;

        }
        .AmPm{
            position: absolute;
            top: 50px;
            left: 20%;
            text-align: center;
            font-size: 50px;
        }
        a{
            position: absolute;
            left: 45%;
            font-size: 30px;
            top: 500px
        }

    </style>
</head>

<body>
    <div id="clock">
        <div id ="AmPm"class="AmPm"></div>
        <div id ="time"class="time"></div>
        <div id ="date"class="date"></div>
        <div id ="enter"class="enter"></div>
    </div>

    <div id ="enter">
        <a href="./login.html">들어가기</a>
    </div>



</body>
<!-- HTML 실행 후 script 실행해야돼서 밑으로 내림 제이쿼리 이용하여 가능 할 듯$fun() or 
    document.ready ? -->
<script>
    function setClock(){
    var t = new Date();

    var hour = setTime(t.getHours());
    var minute = setTime(t.getMinutes());
    var second = setTime(t.getSeconds());
    console.log(typeof second);
    var year = t.getFullYear();
    var month = t.getMonth()+1;
    var date = t.getDate();
    var day = setDay(t.getDay()); //(일:0 ~ 토:6)
    var amPm = setAmPm(t.getHours());
    document.getElementById('AmPm').innerHTML = amPm;
    document.getElementById('time').innerHTML = hour +":"+ minute + ":" + second;
    document.getElementById('date').innerHTML = year +"년 "+ month + "월 " + date + "일 " + day;
    };
    //10 이하의 시분초들을 두자리로 표현하는 함수
    function setTime(time){
        if(time < 10){
            return "0" + time;
        }
        else{
            return time;
        }
    };
    //요일 변환 함수
    function setDay(day){
        switch(day){
            case 0: return "일요일"; break;
            case 1: return "월요일"; break;
            case 2: return "화요일"; break;
            case 3: return "수요일"; break;
            case 4: return "목요일"; break;
            case 5: return "금요일"; break;
            case 6: return "토요일"; break;
        }
    };
    //am pm 판별해주는 함수
    function setAmPm(time){
        if(time>=0&&time<=11){
            return "AM"
        }
        else{
            return "PM"
        }
    };

    window.onload = function(){
        setClock(); //시간 날짜를 가져오는 함수
        setInterval(setClock,1000); //1초마다 setClock함수 실행한다.
    };
</script>
    `;
    },
    LOGIN: function () {
        return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>login</title>
            <style>
                    body{
                        position:relative;
                        margin-top: 10%;
                        margin-left: 30%;
                        width: 600px;
                        height: 400px;
                        border : 4px solid #000000;
                    }
                   header{
                        display:flex;
                        justify-content: center;
                    }
                    form{
        
                        padding:10px;
                        position:relative;
                    }
                    .input-box{
                        position:relative;
                        margin:10px 0;
                    }
                    .input-box > input{
                        background:transparent;
                        border:none;
                        border-bottom: solid 1px #ccc;
                        padding:20px 0px 5px 0px;
                        font-size:14pt;
                        width:100%;
                    }
                    input::placeholder{
                        color:transparent;
                    }
                    input:placeholder-shown + label{
                        color:#aaa;
                        font-size:14pt;
                        top:15px;
        
                    }
                    input:focus + label, label{
                        color:#8aa1a1;
                        font-size:10pt;
                        pointer-events: none;
                        position: absolute;
                        left:0px;
                        top:0px;
                        transition: all 0.2s ease ;
                        -webkit-transition: all 0.2s ease;
                        -moz-transition: all 0.2s ease;
                        -o-transition: all 0.2s ease;
                    }
        
                    input:focus, input:not(:placeholder-shown){
                        border-bottom: solid 1px #8aa1a1;
                        outline:none;
                    }
                    input[type=submit]{
                        background-color: #8aa1a1;
                        border:none;
                        color:white;
                        border-radius: 5px;
                        width:100%;
                        height:35px;
                        font-size: 14pt;
                        margin-top:100px;
                    }
                    #gaib{
                        position:absolute;
                        text-align: center;
                        font-size:15pt;
                        color:rgba(160, 13, 13, 0.336);
                        text-decoration: none;
                        top: 60%;
                    }
            </style>
        </head>
        <body>
            <header>
                <h2>로그인</h2>
            </header>
        
            <form action="http://localhost:3000.login" method="POST">
        
                <div class="input-box">
                    <input id="username" type="text" name="username" placeholder="아이디">
                    <label for="username">아이디</label>
                </div>
        
                <div class="input-box">
                    <input id="password" type="password" name="password" placeholder="비밀번호">
                    <label for="password">비밀번호</label>
                </div>
                <!-- 색 바꾸기 -->
                <a href="./register.html" id="gaib">회원가입하기</a>
                <input type="submit" value="로그인">
        
            </form>
        </body>
        </html>
        `;
    },
    REGISTER: function () {
        return `
 <!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <style>
        body{
            position:relative;
            margin-top: 10%;
            margin-left: 30%;
            width: 600px;
            height: 400px;
            border : 4px solid #000000;
        }
        header{
            display:flex;
            justify-content: center;
        }
        form{
            padding:10px;
            position:relative;
        }
        .input-box{
            position:relative;
            margin:10px 0;
            }
        .input-box > input{
            background:transparent;
            border:none;
            border-bottom: solid 1px #ccc;
            padding:20px 0px 5px 0px;
            font-size:14pt;
            width:100%;
        }
        input::placeholder{
            color:transparent;
        }
        input:placeholder-shown + label{
            color:#aaa;
            font-size:14pt;
            top:15px;
        }
        input:focus + label, label{
            color:#8aa1a1;
            font-size:10pt;
            pointer-events: none;
            position: absolute;
            left:0px;
            top:0px;
            transition: all 0.2s ease ;
            -webkit-transition: all 0.2s ease;
            -moz-transition: all 0.2s ease;
            -o-transition: all 0.2s ease;
            }
    
        input:focus, input:not(:placeholder-shown){
            border-bottom: solid 1px #8aa1a1;
            outline:none;
            }
        input[type=submit]{
            background-color: #8aa1a1;
            border:none;
            color:white;
            border-radius: 5px;
            width:100%;
            height:35px;
            font-size: 14pt;
            margin-top:50px;
            }
        #gaib{
            text-align: center;
            font-size:12pt;
            color:rgba(0, 0, 0, 0.336);
            margin-top: 30px;
        }
    </style>
</head>
    <body>
        <header>
            <h2>회원가입</h2>
        </header>
    
        <form action="" method="POST">
    
            <div class="input-box">
                <input id="username" type="text" name="username" placeholder="아이디">
                <label for="username">이름</label>
            </div>
    
            <div class="input-box">
                <input id="username" type="text" name="username" placeholder="아이디">
                <label for="username">아이디</label>
            </div>
    
            <div class="input-box">
                <input id="password" type="password" name="password" placeholder="비밀번호">
                <label for="password">비밀번호</label>
            </div>
            <!-- 색 바꾸기 -->
            <input type="submit" value="완료">
    
        </form>
    </body>
</html>
        `;
    }

}
