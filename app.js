'use strict';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import authRouter from './api/routes/auth.js';
import apiRouter from './api/routes/api.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/drakescrowd');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET || 'asdf'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
