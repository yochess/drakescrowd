'use strict';
import data from './data.js';

const Properties = data.properties;
const Companies = data.companies;
const Investments = data.investments;

const fetchOfferings = (req, res) => {

  const data = Properties.map(property => {
    return {
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
      company: Companies[property.companyId-1].name
    };
  })

  return res.send(data);
};

const fetchOffering = (req, res) => {
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
    company: Companies[property.companyId-1].name,
    additionalDetails: property.additionalDetails
  };

  return res.send(data);
};

const postOffering = (req, res) => {

};

export default {
  fetchOfferings,
  fetchOffering,
  postOffering
};
