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
  const companyId = req.session.passport.user.slice(7);
  const propertyId = req.params.id;
  db.Property.findOne({
    where: {
      id: propertyId,
      companyId: companyId
    }
  })
  .then(property => {
    const shares = req.body.shares === undefined ? property.shares : req.body.shares;
    const min = req.body.min === undefined ? property.min : req.body.min;
    const available = req.body.available === undefined ? 0 : 1;

    property.updateAttributes({
      available: available,
      shares: shares,
      min: min
    })
    .then(() => {
      res.status(201).send('done!');
    });
  });
};

const acceptInvestment = (req, res) => {
  const companyId = +req.session.passport.user.slice(7);
  const propertyId = +req.body.investment.propertyId;
  const investmentId = +req.body.investment.id;
  const approved = +req.body.accept;

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
        approved: approved
      })
      .then(() => {
        property.updateAttributes({
          shares: property.shares - (approved === 1 ? investment.amount : 0)
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
  editListing,
  acceptInvestment
};
