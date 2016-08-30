'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _listings = require('../controllers/listings.js');

var _listings2 = _interopRequireDefault(_listings);

var _offerings = require('../controllers/offerings.js');

var _offerings2 = _interopRequireDefault(_offerings);

var _investments = require('../controllers/investments.js');

var _investments2 = _interopRequireDefault(_investments);

var _auth = require('../controllers/auth.js');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAuth = _auth2.default.checkAuthMW;

var apiRouter = _express2.default.Router();
apiRouter.get('/offerings', _offerings2.default.fetchOfferings).get('/offerings/:id', _offerings2.default.fetchOffering);

apiRouter.get('/listings', isAuth('company'), _listings2.default.fetchListings).get('/listings/:id', isAuth('company'), _listings2.default.fetchListing).post('/listings', isAuth('company'), _listings2.default.makeListing).put('/listings/:id', isAuth('company'), _listings2.default.editListing);

apiRouter.get('/investments', isAuth('investor'), _investments2.default.fetchInvestments).post('/investments', isAuth('investor'), _investments2.default.makeInvestment).put('/investments/accept', isAuth('company'), _listings2.default.acceptInvestment);

exports.default = apiRouter;