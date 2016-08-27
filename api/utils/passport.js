'use strict';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Investor, Company } from '../utils/dbconfig.js';

passport.serializeUser((user, done) => {
  const type = user instanceof Investor.Instance ? 'investor' : 'company';

  done(null, type + user.id);
});

passport.deserializeUser((typeAndId, done) => {
  const type = typeAndId.slice(0,8);
  const user = type === 'investor' ? Investor : Company;
  const id = type === 'investor' ? typeAndId.slice(8) : typeAndId.slice(7);

  user.findById(id)
  .then(user => done(null, user))
  .catch(err => done(err));
});

passport.use('local-signup', new LocalStrategy(
  {passReqToCallback: true},
  (req, username, password, done) => {
    const user = req.session.userType === 'investor' ? Investor : Company;

    user.findOne({where: {username}}).then(userExists => {
      if (userExists) {
        return done(null, false, 'User Exists!');
      }
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          user.create({username: username, password: hash})
            .then(newUser => done(null, newUser, 'Created User!'))
            .catch(err => done(err))
          });
      });
    })
    .catch(err => done(err));
  }));

passport.use('local-login', new LocalStrategy(
  {passReqToCallback: true},
  (req, username, password, done) => {
    const user = req.session.userType === 'investor' ? Investor : Company;

    user.findOne({where: {username}}).then(user => {
      if (!user) {
        return done(null, false, 'Incorrect Username or Password!');
      }
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, 'Incorrect Username or Password');
        }
        return done(null, user, 'Signed In!');
      });

    })
    .catch(err => done(err));
}));

export { passport };
