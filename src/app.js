'use strict';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
// import sessionFileStore from 'session-file-store';
import authRouter from './api/routes/auth.js';
import apiRouter from './api/routes/api.js';

const app = express();
// const FileStore = sessionFileStore(session);
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET || 'asdf',
  resave: true,
  saveUninitialized: true,
  // store: new FileStore(),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('*', function(req, res, next) {
  return res.redirect('/#' + req.originalUrl);
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
