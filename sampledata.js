'use strict';
import db from './src/api/utils/dbconfig.js';
import bcrypt from 'bcryptjs';

const encrypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}


let company_1;
let company_2;

let investor_1;
let investor_2;

let property_1;
let property_2;
let property_3;
let property_4;


db.Company.create({
  username: 'abc',
  password: encrypt('abc')
})
.then(company => {
  company_1 = company;
  return db.Company.create({
    username: 'xyz',
    password: encrypt('eyz')
  });
})
.then(company => {
  company_2 = company;
  return db.Investor.create({
    username: 'drake',
    password: encrypt('drake')
  })
})
.then(investor => {
  investor_1 = investor;
  return db.Investor.create({
    username: 'john',
    password: encrypt('john')
  })
})
.then(investor => {
  investor_2 = investor;
  return db.Property.create({
    name: 'huge apartment',
    img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTdvpXTacO8fshpGQN_6nC_L7BL0nY7k0PYP78c8peB8acFiiKDWw',
    type: 'apartment',
    min: 500000,
    irr: 0.3,
    cash: 0.25,
    marketprice: 20000000,
    shares: 15000000,
    available: 1,
    additionaldetails: 'Very Big Apartment Complex with 40 units',
    companyId: company_1.id
  })
})
.then(property => {
  property_1 = property;
  return db.Property.create({
    name: 'small apartment',
    img: 'http://cdn.brownstoner.com/wp-content/uploads/2014/08/719-dean-street-prospect-heights-82014.jpg',
    type: 'apartment',
    min: 200000,
    irr: 0.25,
    cash: 0.2,
    marketprice: 4000000,
    shares: 0,
    available: 0,
    additionaldetails: 'Small Apartment for Investment!',
    companyId: company_1.id
  })
})
.then(property => {
  property_2 = property;
  return db.Property.create({
    name: 'huge house',
    img: 'http://sanmateo-realestate.com/wp-content/uploads/2013/07/new-housing.jpg',
    type: 'house',
    min: 100000,
    irr: 0.25,
    cash: 0.2,
    marketprice: 2000000,
    shares: 1000000,
    available: 1,
    additionaldetails: 'Huge House for Investment!',
    companyId: company_2.id
  })
})
.then(property => {
  property_3 = property;
  return db.Property.create({
    name: 'small house',
    img: 'http://www.titusville.com/Images/ImageManager/How-To-Avoid-Inheritance-Tax-On-Property.jpg',
    type: 'house',
    min: 50000,
    irr: 0.2,
    cash: 0.15,
    marketprice: 1000000,
    shares: 0,
    available: 0,
    additionaldetails: 'Small House for Investment!',
    companyId: company_2.id
  })
})
.then(property => {
  property_4 = property;
  return db.Investment.create({
    amount: 5000000,
    pending: 0,
    approved: 1,
    propertyId: 1,
    investorId: 1
  })
})
.then(investment => {
  return db.Investment.create({
    amount: 5000000,
    pending: 1,
    approved: 0,
    propertyId: 1,
    investorId: 2
  })
})
.then(investment => {
  return db.Investment.create({
    amount: 2000000,
    pending: 0,
    approved: 1,
    propertyId: 2,
    investorId: 1
  })
})
.then(investment => {
  return db.Investment.create({
    amount: 2000000,
    pending: 0,
    approved: 1,
    propertyId: 2,
    investorId: 2
  })
})
.then(investment => {
  return db.Investment.create({
    amount: 1000000,
    pending: 0,
    approved: 1,
    propertyId: 3,
    investorId: 1
  })
})
.then(investment => {
  return db.Investment.create({
    amount: 1000000,
    pending: 0,
    approved: 1,
    propertyId: 4,
    investorId: 2
  })
});
