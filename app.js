require('dotenv').config()  
const express = require('express');
const engine = require('ejs-mate')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session")
const passport = require('passport')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts')
const reviewsRouter = require('./routes/reviews')

const User = require('./models/user');

// const seedPosts = require('./seeds')
// seedPosts()

const app = express();

mongoose.connect('mongodb://localhost:27017/surf_shop', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log("we're connected")
})
// view engine setup
app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))


app.use(session({
  secret: 'gaspeidinho',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  // req.user = {
  //   "_id" : "5f2470cb8ed0d716b0ae1670",
  //    "username" : "pisty"
  // }
  res.locals.currentUser = req.user
  res.locals.title = "Surf Shop"
  res.locals.success = req.session.success || ''
  delete req.session.success
  res.locals.error = req.session.error || ''
  delete req.session.error
  next()
})

app.use('/', indexRouter);
app.use('/posts', postsRouter)
app.use('/posts/:id/reviews', reviewsRouter)
// catch 404 and forward to error handler



// app.use(function(req, res, next) {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err)
  req.session.error = err.message
  res.redirect('back')
});

module.exports = app;
