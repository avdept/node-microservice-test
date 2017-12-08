'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _auth = require('../libs/auth');

var users = [['admin', 'admin', true], ['user', 'user', false]];

var findUser = function findUser(req) {
  return (0, _lodash.find)(users, function (user) {
    return user[0] === req.body.username && user[1] === req.body.password;
  });
};

var login = function login(req, res) {
  // I didn't implement hashing check for password since its not in scope of test task,
  // but overall it should look like following(pseudocode)
  // user = user.get_from_db(username);
  // if user.password == hash_with_salt(req.body.password) return true;
  var user = findUser(req);
  console.log(user);
  if (user) {
    // TODO: Refactor this to have also regular user
    var token = (0, _auth.createJWToken)(_extends({}, req.body, { admin: user[2] }));
    res.status(200).json({ jwt_token: token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.default = login;