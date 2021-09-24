const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const {router: indexRouter} = require('./routes/index');
const usersRouter = require('./routes/users');
const topicsRouter = require('./routes/topics')
const followsRouter = require('./routes/follows');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const { restoreUser } = require('./auth');


const app = express();

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('superSecret'));
app.use(express.static(path.join(__dirname, 'public')));

const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: 'superSecret',
    store,
    saveUninitialized: false,
    resave: false,
  })
);

store.sync();
app.use(restoreUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/topics', topicsRouter);
app.use('/follows', followsRouter);

app.use((req, res, next) =>{
  next(createError(404));
});

app.use((err, req, res, next) =>{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
