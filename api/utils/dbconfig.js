'use strict';
import Sequelize from 'sequelize';

const sequelize = new Sequelize('drakescrowd', process.env.SQL_USER || 'root', process.env.SQL_PW || '', {
  logging: false
});

const Investor = sequelize.define('investor', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const Company = sequelize.define('company', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const Property = sequelize.define('property', {
  name: Sequelize.STRING,
  img: Sequelize.STRING,
  type: Sequelize.STRING,
  min: Sequelize.FLOAT,
  irr: Sequelize.FLOAT,
  cash: Sequelize.FLOAT,
  marketprice: Sequelize.FLOAT,
  shares: Sequelize.FLOAT,
  available: {type: Sequelize.BOOLEAN, defaultValue: true},
  additionaldetails: Sequelize.STRING
});

const Investment = sequelize.define('investment', {
  amount: Sequelize.FLOAT,
  pending: {type: Sequelize.BOOLEAN, defaultValue: true},
  approved: {type: Sequelize.BOOLEAN, defaultValue: false}
});

Property.belongsTo(Company);
Company.hasMany(Property);

Investment.belongsTo(Property);
Investment.belongsTo(Investor);
Property.hasMany(Investment);
Investor.hasMany(Investment);

sequelize.sync();

export default {
  Investor,
  Company,
  Property,
  Investment
}
