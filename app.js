var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log("app listen to the port http://127.0.0.1:" + port)
})


//start mongodb connection

const MongoClient = require('mongodb').MongoClient


//insert Query
MongoClient.connect('mongodb://localhost:27017/expresstest', function (err, client) {
  if (err) throw err
//database name at the place of expresstest
  let db = client.db('expresstest')
//below command used for table connection and fetch the value of it
  let query = { id: "25",name:"Anivesh",number:"9589957399" };//for fetch particular data use query as find parameters (select  query)
  db.collection('testtable').insertOne(query,function(err, result){
    if (err) {
      console.log(err)
    }
    console.log("hi")
    console.log(result)

  })

  function close(){
    client.close()
  }
})
console.log("hii")

//connect with database select query
MongoClient.connect('mongodb://localhost:27017/expresstest', function (err, client) {
  if (err) throw err
//database name at the place of expresstest
  let db = client.db('expresstest')
//below command used for table connection and fetch the value of it
  var query = { id: "12" };//for fetch particular data use query as find parameters (select  query)
  db.collection('testtable').find().toArray(function (err, result) {
    if (err)
    {
      console.log(err)
    }

    console.log(result)

  })


})


//select data from id
app.get('/user/:id',function(req,res){
MongoClient.connect("mongodb://localhost:27017/expresstest",function(err,db){
  if (err) throw err
  let database=db.db('expresstest')
  let query={id:req.params.id}
  database.collection('testtable').find().toArray(function (err,result){
    if (err) throw err
    console.log(result)
  })

})
})
app.get('/home',function(req,res){
  res.send("home page")
})

module.exports = app;
