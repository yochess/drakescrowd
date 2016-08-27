'use strict';
import express from 'express';
import Auth from '../controllers/auth.js'

const authRouter = express.Router();

authRouter
  .post('/login', Auth.login)
  .post('/signup', Auth.signup);

export default authRouter;
