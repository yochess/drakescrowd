'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./api/routes/auth.js');

var _auth2 = _interopRequireDefault(_auth);

var _api = require('./api/routes/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import sessionFileStore from 'session-file-store';
var app = (0, _express2.default)();
// const FileStore = sessionFileStore(session);
var PORT = process.env.PORT || 3000;

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use((0, _expressSession2.default)({
  secret: process.env.SECRET || 'asdf',
  resave: true,
  saveUninitialized: true
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/auth', _auth2.default);
app.use('/api', _api2.default);

app.get('*', function (req, res, next) {
  return res.redirect('/#' + req.originalUrl);
});

app.listen(PORT, function () {
  console.log('App listening on port: ' + PORT);
});