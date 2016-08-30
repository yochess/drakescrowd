'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbconfig = require('../utils/dbconfig.js');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchListings = function fetchListings(req, res) {
  var companyId = +req.session.passport.user.slice(7);

  _dbconfig2.default.Property.findAll({
    where: { companyId: companyId },
    include: [{
      model: _dbconfig2.default.Investment,
      include: [{
        model: _dbconfig2.default.Investor,
        attributes: { exclude: ['password'] }
      }]
    }]
  }).then(function (properties) {
    return res.send(properties);
  });
};

var fetchListing = function fetchListing(req, res) {
  var companyId = +req.session.passport.user.slice(7);
  var propertyId = +req.params.id;

  _dbconfig2.default.Property.findOne({
    where: {
      id: propertyId,
      companyId: companyId
    },
    include: [{
      model: _dbconfig2.default.Investment,
      include: [{
        model: _dbconfig2.default.Investor,
        attributes: { exclude: ['password'] }
      }]
    }]
  }).then(function (property) {
    return res.send(property);
  });
};

var makeListing = function makeListing(req, res) {
  var companyId = +req.session.passport.user.slice(7);

  _dbconfig2.default.Property.create({
    name: req.body.name,
    img: req.body.img,
    type: req.body.type,
    min: req.body.min,
    irr: req.body.irr / 100,
    cash: req.body.cash / 100,
    marketprice: req.body.marketprice,
    shares: req.body.shares,
    available: req.body.available,
    additionaldetails: req.body.additionaldetails,
    companyId: companyId
  }).then(function (result) {
    return res.status(201).send('Created!');
  });
};

var editListing = function editListing(req, res) {
  var companyId = req.session.passport.user.slice(7);
  var propertyId = req.params.id;
  _dbconfig2.default.Property.findOne({
    where: {
      id: propertyId,
      companyId: companyId
    }
  }).then(function (property) {
    var shares = req.body.shares === undefined ? property.shares : req.body.shares;
    var min = req.body.min === undefined ? property.min : req.body.min;
    var available = req.body.available === undefined ? 0 : 1;

    property.updateAttributes({
      available: available,
      shares: shares,
      min: min
    }).then(function () {
      res.status(201).send('done!');
    });
  });
};

var acceptInvestment = function acceptInvestment(req, res) {
  var companyId = +req.session.passport.user.slice(7);
  var propertyId = +req.body.investment.propertyId;
  var investmentId = +req.body.investment.id;
  var approved = +req.body.accept;

  _dbconfig2.default.Property.findOne({
    where: {
      id: propertyId,
      companyId: companyId
    }
  }).then(function (property) {
    _dbconfig2.default.Investment.findOne({
      where: {
        id: investmentId
      }
    }).then(function (investment) {
      investment.updateAttributes({
        pending: 0,
        approved: approved
      }).then(function () {
        property.updateAttributes({
          shares: property.shares - (approved === 1 ? investment.amount : 0)
        }).then(function () {
          return res.status(201).send('Updated!');
        });
      });
    });
  });
};

exports.default = {
  fetchListings: fetchListings,
  fetchListing: fetchListing,
  makeListing: makeListing,
  editListing: editListing,
  acceptInvestment: acceptInvestment
};