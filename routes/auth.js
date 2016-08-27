'use strict';
import express from 'express';
const authRouter = express.Router();

authRouter
  .post('/investor/login', () => {})
  .post('/investor/signup', () => {});

authRouter
  .post('/company/login', () => {})
  .post('/company/signup', () => {})

export default authRouter;
