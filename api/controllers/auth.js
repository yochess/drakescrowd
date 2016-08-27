'use strict';
import passportSetup  from '../utils/passport.js';
import passport from 'passport';

const signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  req.session.userType = req.body.userType;

  passport.authenticate('local-signup', (err, proceed, info) => {
    if (err) {
      return res.status(500).send('Interval Error');
    }
    if (!proceed) {
      return res.status(409).send(info);
    }
    req.logIn(proceed, (err) => {
      if (err) {
        return res.status(500).send('Interval Error');
      }
      return res.status(201).send(info);
    });
  })(req, res, next);
};

const login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  req.session.userType = req.body.userType;

  passport.authenticate('local-login', (err, proceed, info) => {
    if (err) {
      return res.status(500).send('Internal Error');
    }
    if (!proceed) {
      return res.status(401).send(info);
    }
    req.logIn(proceed, (err) => {
      if (err) {
        return res.status(500).send('Interval Error');
      }
      return res.status(200).send(info);
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.status(200).send('Logged Out!');
};

const userType = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(200).send('');
  }
  const userType = req.session.passport.user.slice(0,8) === 'investor' ? 'investor' : 'company';
  return res.status(200).send(userType);
}

export default {
  login,
  signup,
  logout,
  userType
};
