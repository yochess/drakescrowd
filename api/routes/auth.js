'use strict';
import express from 'express';
import Auth from '../controllers/auth.js'

const authRouter = express.Router();

authRouter
  .post('/login', Auth.login)
  .post('/signup', Auth.signup)
  .get('/logout', Auth.logout)
  .get('/userType', Auth.userType)

export default authRouter;
