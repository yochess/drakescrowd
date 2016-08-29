'use strict';
import db from '../utils/dbconfig.js';

const fetchListings = (req, res) => {
  const companyId = +req.session.passport.user.slice(7);

  db.Property.findAll({
    where: {companyId: companyId},
    include: [{
      model: db.Investment,
      include: [{
        model: db.Investor,
        attributes: {exclude: ['password']}
      }]
    }]
  })
  .then(properties => {
    return res.send(properties);
  });
};

const fetchListing = (req, res) => {
  const companyId = +req.session.passport.user.slice(7);
  const propertyId = +req.params.id;

  db.Property.findOne({
    where: {
      id: propertyId,
      companyId: companyId
    },
    include: [{
      model: db.Investment,
      include: [{
        model: db.Investor,
        attributes: {exclude: ['password']}
      }]
    }]
  })
  .then(property => {
    return res.send(property);
  })
};

const makeListing = (req, res) => {
  const companyId = +req.session.passport.user.slice(7);

  db.Property.create({
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
  })
  .then(result => {
    return res.status(201).send('Created!');
  });
};

const editListing = (req, res) => {
  const companyId = +req.session.passport.user.slice(7);
  const propertyId = +req.body.investment.propertyId;
  const investmentId = +req.body.investment.id;

  db.Property.findOne({
    where: {
      id: propertyId,
      companyId: companyId
    }
  })
  .then(property => {
    db.Investment.findOne({
      where: {
        id: investmentId
      }
    })
    .then(investment => {
      investment.updateAttributes({
        pending: 0,
        approved: +req.body.accept
      })
      .then(() => {
        property.updateAttributes({
          shares: property.shares - investment.amount
        })
        .then(() => {
          return res.status(201).send('Updated!')
        })
      });
    });

  });

};

export default {
  fetchListings,
  fetchListing,
  makeListing,
  editListing
};
