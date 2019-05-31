'use strict';
var express = require('express');
var bodyParser = require("body-parser");
var url = require('url');
const pg = require('pg');
//--Подключение к базе
var connectionString = "postgres://postgres:heine@localhost:5432/NewUsers";
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var br=String.fromCharCode(13)+String.fromCharCode(10);
var client, done;

app.use(express.static(__dirname + "/z5"));
app.use(function(request, response, next){

    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(request.url);
    next();
});


//--Запрос добавления пользователя в базу при регистрации
app.post("/add_user", urlencodedParser,  function (request, response) {
 
 console.log('add_user')
 
  
    if(!request.body) return response.sendStatus(400);
    
  console.log('body=',request.body)
    const query1 = client.query('SELECT email FROM users WHERE email=$1', [request.body.email])
    query1.on('end', () => {
    if(query1._result.rowCount==1) {
      console.log('Пользователь с таким логином есть, придумайте свой!')
      // response.send('Пользователь с таким логином есть, придумайте свой!')
      response.cookie('user','minus');
    }
      else {
    
        const query = client.query('INSERT INTO users(login, email, password) values($1, $2, $3)',
        [request.body.login,request.body.mail,request.body.password]);
        query.on('end', () => {
          // done();
          response.cookie('user','exist');
          response.redirect('main.html');
        
        });
      }
    });

});

//--Запрос проверки наличия данных пользователя в базе при попытке входа
app.post("/search_user", urlencodedParser,  function (request, response) {

  console.log('searchuser, begin')

    if(!request.body) return response.sendStatus(400);
  
    const query = client.query('SELECT * FROM users WHERE login= $1 AND password=$2',
    [request.body.login,request.body.password]);
    query.on('end', () => {
   
      console.log('rowCount=',query._result.rowCount)
      if (query._result.rowCount==0) 
{
        response.send('Неправильный ввод логина или пароля!')
        }
        else {
        response.cookie('user','exist');
        response.redirect('main.html')
        }
    });
});

//--Запрос получения списка всех пользователей
app.get("/GetUsers", function(request, response)  {
  const query = client.query('SELECT * FROM users')
    query.on('end', (fil) => {
      console.log('fil=',fil.rows)
      response.send(fil.rows)
    }); 
});

app.get("/", function(request, response)
   {
    console.log('redirect')
    response.cookie('user','new');
    response.redirect('/main.html')

})

    pg.connect(connectionString, (err, _client, _done) => { //соединение с postgres
    if(err) {
      _done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    else {
      client=_client; done=_done;
      console.log('*******Соединение с базой PostgreSQL - норм.')
    }
    });

app.listen(3000);

