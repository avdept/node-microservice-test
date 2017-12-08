'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJWToken = exports.verifyJWToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyJWToken = exports.verifyJWToken = function verifyJWToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
};

var createJWToken = exports.createJWToken = function createJWToken(details) {
  var token = _jsonwebtoken2.default.sign({
    data: details
  }, process.env.JWT_SECRET, {
    expiresIn: 3600,
    algorithm: 'HS256'
  });

  return token;
};