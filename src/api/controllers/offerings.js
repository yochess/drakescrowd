'use strict';
import db from '../utils/dbconfig.js';

const fetchOfferings = (req, res) => {
  db.Property.findAll({include: [{
    model: db.Company,
    attributes: {exclude: ['password']}
  }]})
  .then(properties => res.send(properties));
};

const fetchOffering = (req, res) => {
  const propertyId = +req.params.id;

  db.Property.findOne({
    where: {id: propertyId},
    include: {
      model: db.Company,
      attributes: {exclude: ['password']}
    }
  })
  .then(property => res.send(property));
};

export default {
  fetchOfferings,
  fetchOffering
};
