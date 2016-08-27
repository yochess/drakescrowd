'use strict';
import express from 'express';
import listingsCtrl from '../controllers/listings.js';
import offeringsCtrl from '../controllers/offerings.js'

const apiRouter = express.Router();
apiRouter
  .get('/offerings', offeringsCtrl.fetchOfferings)
  .get('/offerings/:id', offeringsCtrl.fetchOffering);


apiRouter
  .get('/listings', listingsCtrl.fetchListings)
  .get('/listings/:id', listingsCtrl.fetchListing)
  .post('/listings', listingsCtrl.createNewListing);


apiRouter
  .get('/portfolio', (req, res) => {
    // fetch current investments (only available to investor)
  });

export default apiRouter;

