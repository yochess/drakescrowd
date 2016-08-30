'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passport = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passportLocal = require('passport-local');

var _dbconfig = require('../utils/dbconfig.js');

var _dbconfig2 = _interopRequireDefault(_dbconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.serializeUser(function (user, done) {
  var type = user instanceof _dbconfig2.default.Investor.Instance ? 'investor' : 'company';

  done(null, type + user.id);
});

_passport2.default.deserializeUser(function (typeAndId, done) {
  var type = typeAndId.slice(0, 8);
  var user = type === 'investor' ? _dbconfig2.default.Investor : _dbconfig2.default.Company;
  var id = type === 'investor' ? typeAndId.slice(8) : typeAndId.slice(7);

  user.findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    return done(err);
  });
});

_passport2.default.use('local-signup', new _passportLocal.Strategy({ passReqToCallback: true }, function (req, username, password, done) {
  var user = req.session.userType === 'investor' ? _dbconfig2.default.Investor : _dbconfig2.default.Company;
  var info = req.session.userType === 'investor' ? 'investor' : 'company';

  user.findOne({ where: { username: username } }).then(function (userExists) {
    if (userExists) {
      return done(null, false, 'User Exists!');
    }
    _bcryptjs2.default.genSalt(10, function (err, salt) {
      _bcryptjs2.default.hash(password, salt, function (err, hash) {
        user.create({ username: username, password: hash }).then(function (newUser) {
          return done(null, newUser, info);
        }).catch(function (err) {
          return done(err);
        });
      });
    });
  }).catch(function (err) {
    return done(err);
  });
}));

_passport2.default.use('local-login', new _passportLocal.Strategy({ passReqToCallback: true }, function (req, username, password, done) {
  var user = req.session.userType === 'investor' ? _dbconfig2.default.Investor : _dbconfig2.default.Company;
  var info = req.session.userType === 'investor' ? 'investor' : 'company';

  user.findOne({ where: { username: username } }).then(function (user) {
    if (!user) {
      return done(null, false, 'Incorrect Username or Password!');
    }
    _bcryptjs2.default.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, 'Incorrect Username or Password');
      }
      return done(null, user, info);
    });
  }).catch(function (err) {
    return done(err);
  });
}));

exports.passport = _passport2.default;