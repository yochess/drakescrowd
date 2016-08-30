'use strict';
import db from '../utils/dbconfig.js';

const makeInvestment = (req, res) => {
  const investorId = req.session.passport.user.slice(8);
  const propertyId = req.body.id;

  db.Investment.create({
    amount: req.body.amount,
    pending: true,
    approved: false,
    propertyId: propertyId,
    investorId: investorId
  })
  .then(investment => res.send('Investment Created!'));
};

const fetchInvestments = (req, res) => {
  const investorId = req.session.passport.user.slice(8);

  db.Investment.findAll({
    where: {investorId: investorId},
    include: [{
      model: db.Property,
      include: [{
        model: db.Company,
        attributes: {exclude: ['password']}
      }]
    }]
  })
  .then(investments => {
    return res.send(investments);
  })
};

export default {
  makeInvestment,
  fetchInvestments
};
