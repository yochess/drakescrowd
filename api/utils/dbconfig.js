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

sequelize.sync();

export {
  Investor,
  Company
}
