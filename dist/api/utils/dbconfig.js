'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const sequelize = new Sequelize(process.env.SQL_DB || 'drakescrowd', process.env.SQL_USER || 'root', process.env.SQL_PW || '', {
//   logging: false
// });

var sequelize = new _sequelize2.default(process.env.HEROKU_POSTGRESQL || 'postgres://localhost:5432/todo', {
  logging: false
});

var Investor = sequelize.define('investor', {
  username: _sequelize2.default.STRING,
  password: _sequelize2.default.STRING
});

var Company = sequelize.define('company', {
  username: _sequelize2.default.STRING,
  password: _sequelize2.default.STRING
});

var Property = sequelize.define('property', {
  name: _sequelize2.default.STRING,
  img: _sequelize2.default.STRING,
  type: _sequelize2.default.STRING,
  min: _sequelize2.default.FLOAT,
  irr: _sequelize2.default.FLOAT,
  cash: _sequelize2.default.FLOAT,
  marketprice: _sequelize2.default.FLOAT,
  shares: _sequelize2.default.FLOAT,
  available: { type: _sequelize2.default.BOOLEAN, defaultValue: true },
  additionaldetails: _sequelize2.default.STRING
});

var Investment = sequelize.define('investment', {
  amount: _sequelize2.default.FLOAT,
  pending: { type: _sequelize2.default.BOOLEAN, defaultValue: true },
  approved: { type: _sequelize2.default.BOOLEAN, defaultValue: false }
});

Property.belongsTo(Company);
Company.hasMany(Property);

Investment.belongsTo(Property);
Investment.belongsTo(Investor);
Property.hasMany(Investment);
Investor.hasMany(Investment);

sequelize.sync();

exports.default = {
  Investor: Investor,
  Company: Company,
  Property: Property,
  Investment: Investment
};