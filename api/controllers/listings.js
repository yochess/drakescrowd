'use strict';
import data from './data.js';

const Properties = data.properties;
const Companies = data.companies;
const Investments = data.investments;

const fetchListings = (req, res) => {
  const data = Properties.map(property => {
    return {
      id: property.id,
      name: property.name,
      type: property.type,
      min: property.min,
      target: {
        irr: property.target.irr,
        cash: property.target.cash
      },
      available: property.available
    };
  });

  return res.send(data);
};

const fetchListing = (req, res) => {
  const id = +req.params.id;
  const property = Properties[id-1];
  const data = {
    id: property.id,
    name: property.name,
    img: property.img,
    type: property.type,
    min: property.min,
    target: {
      irr: property.target.irr,
      cash: property.target.cash
    },
    marketPrice: property.marketPrice,
    available: property.available,
    investors: Investments.filter(investment => {
      return investment.propertyId === property.id &&
        investment.pending === false &&
        investment.approved === true;
    }),
    pending: Investments
      .filter(investment => {
        return investment.propertyId === property.id &&
          investment.pending === true;
      })
  };

  return res.send(data);
};

const createNewListing = (req, res) => {
  // post new listing
};

export default {
  fetchListings,
  fetchListing,
  createNewListing
};
