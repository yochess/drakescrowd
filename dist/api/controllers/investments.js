'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbconfig = require('../utils/dbconfig.js');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeInvestment = function makeInvestment(req, res) {
  var investorId = req.session.passport.user.slice(8);
  var propertyId = req.body.id;

  _dbconfig2.default.Investment.create({
    amount: req.body.amount,
    pending: true,
    approved: false,
    propertyId: propertyId,
    investorId: investorId
  }).then(function (investment) {
    return res.send('Investment Created!');
  });
};

var fetchInvestments = function fetchInvestments(req, res) {
  var investorId = req.session.passport.user.slice(8);

  _dbconfig2.default.Investment.findAll({
    where: { investorId: investorId },
    include: [{
      model: _dbconfig2.default.Property,
      include: [{
        model: _dbconfig2.default.Company,
        attributes: { exclude: ['password'] }
      }]
    }]
  }).then(function (investments) {
    return res.send(investments);
  });
};

exports.default = {
  makeInvestment: makeInvestment,
  fetchInvestments: fetchInvestments
};