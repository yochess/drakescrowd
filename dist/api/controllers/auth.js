'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('../utils/passport.js');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signup = function signup(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  req.session.userType = req.body.userType;

  _passport4.default.authenticate('local-signup', function (err, proceed, info) {
    if (err) {
      return res.status(500).send('Interval Error');
    }
    if (!proceed) {
      return res.status(409).send(info);
    }
    req.logIn(proceed, function (err) {
      if (err) {
        return res.status(500).send('Interval Error');
      }
      return res.status(201).send(info);
    });
  })(req, res, next);
};

var login = function login(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  req.session.userType = req.body.userType;

  _passport4.default.authenticate('local-login', function (err, proceed, info) {
    if (err) {
      return res.status(500).send('Internal Error');
    }
    if (!proceed) {
      return res.status(401).send(info);
    }
    req.logIn(proceed, function (err) {
      if (err) {
        return res.status(500).send('Interval Error');
      }
      return res.status(200).send(info);
    });
  })(req, res, next);
};

var logout = function logout(req, res) {
  req.logout();
  res.status(200).send('Logged Out!');
};

var userType = function userType(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).send('');
  }
  var userType = req.session.passport.user.slice(0, 8) === 'investor' ? 'investor' : 'company';
  return res.status(200).send(userType);
};

var checkAuthMW = function checkAuthMW(type) {
  return function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    }
    var userType = req.session.passport.user.slice(0, 8) === 'investor' ? 'investor' : 'company';

    if (!(type === userType)) {
      return res.redirect('/');
    }
    return next();
  };
};

exports.default = {
  login: login,
  signup: signup,
  logout: logout,
  userType: userType,
  checkAuthMW: checkAuthMW
};