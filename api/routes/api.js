'use strict';
import express from 'express';
import listingsCtrl from '../controllers/listings.js';
import offeringsCtrl from '../controllers/offerings.js'

const apiRouter = express.Router();


apiRouter
  .post('/listings', listingsCtrl.createNewListing)
  .get('/listings', listingsCtrl.fetchAllListings);

apiRouter
  .get('/offerings', offeringsCtrl.fetchAllOfferings)
  .get('/offerings/:id', offeringsCtrl.fetchOffering);

apiRouter
  .get('/portfolio', (req, res) => {
    // fetch current investments (only available to investor)
  });

export default apiRouter;

