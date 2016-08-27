'use strict';
import express from 'express';
const apiRouter = express.Router();

apiRouter
  .post('/listings', (req, res) => {
    // create new listing (only available to company)
    res.send('ok');
  })
  .get('/listings', (req, res) => {
    // fetch listings (available to public)
  });

apiRouter
  .get('/offerings', (req, res) => {
    // fetch offerings (available to public)
  })
  .get('/offerings/:id', (req, res) => {
    // fetch specific offering (available to public)
  });

apiRouter
  .get('/portfolio', (req, res) => {
    // fetch current investments (only available to investor)
  });

export default apiRouter;
