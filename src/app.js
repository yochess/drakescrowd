'use strict';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
// import sessionFileStore from 'session-file-store';
import authRouter from './api/routes/auth.js';
import apiRouter from './api/routes/api.js';
import multer from 'multer';
import crypto from 'crypto';

const app = express();
// const FileStore = sessionFileStore(session);
const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.ADDRESS || 'http://localhost:3000';

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
  return res.render('index');
});

// will do cleaning in the future //
// this is testing uploading image feature
// used code from https://github.com/expressjs/multer/issues/170

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
const upload = multer({storage: storage});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/upload', upload.any(), (req, res) => {
  const file = req.files[0];
  file.path = `${ADDRESS}/${file.path}`;
  return res.status(201).send(file);
});
// end file uploading feature

app.get('*', function(req, res, next) {
  return res.redirect('/#' + req.originalUrl);
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
