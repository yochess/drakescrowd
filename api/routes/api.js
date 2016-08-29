'use strict';
import express from 'express';
import listingsCtrl from '../controllers/listings.js';
import offeringsCtrl from '../controllers/offerings.js';
import investmentsCtrl from '../controllers/investments.js';
import authCtrl from '../controllers/auth.js';

const isAuth = authCtrl.checkAuthMW;

const apiRouter = express.Router();
apiRouter
  .get('/offerings', offeringsCtrl.fetchOfferings)
  .get('/offerings/:id', offeringsCtrl.fetchOffering)

apiRouter
  .get('/listings', isAuth('company'), listingsCtrl.fetchListings)
  .get('/listings/:id', isAuth('company'), listingsCtrl.fetchListing)
  .post('/listings', isAuth('company'), listingsCtrl.makeListing)
  .put('/listings/:id', isAuth('company'), listingsCtrl.editListing);

apiRouter
  .get('/investments', isAuth('investor'), investmentsCtrl.fetchInvestments)
  .post('/investments', isAuth('investor'), investmentsCtrl.makeInvestment)
  .put('/investments/accept', isAuth('company'), listingsCtrl.acceptInvestment);


export default apiRouter;

