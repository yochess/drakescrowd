'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbconfig = require('../utils/dbconfig.js');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchOfferings = function fetchOfferings(req, res) {
  _dbconfig2.default.Property.findAll({ include: [{
      model: _dbconfig2.default.Company,
      attributes: { exclude: ['password'] }
    }] }).then(function (properties) {
    return res.send(properties);
  });
};

var fetchOffering = function fetchOffering(req, res) {
  var propertyId = +req.params.id;

  _dbconfig2.default.Property.findOne({
    where: { id: propertyId },
    include: {
      model: _dbconfig2.default.Company,
      attributes: { exclude: ['password'] }
    }
  }).then(function (property) {
    return res.send(property);
  });
};

exports.default = {
  fetchOfferings: fetchOfferings,
  fetchOffering: fetchOffering
};