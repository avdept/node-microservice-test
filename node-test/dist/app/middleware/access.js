'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipVerifyJWT = exports.verifyJWT = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _auth = require('../libs/auth');

var handleError = function handleError(res) {
  res.status(401).json({ message: 'Access denied. You are not an admin' });
};

var verifyJWT = exports.verifyJWT = function verifyJWT(req, res, callback) {
  var token = req.headers.authorization;
  if (typeof token === 'string') {
    var _token$split = token.split(' ');

    var _token$split2 = _slicedToArray(_token$split, 2);

    token = _token$split2[1];
  }

  (0, _auth.verifyJWToken)(token).then(function (decodedToken) {
    req.user = decodedToken.data;
    return req.user.admin ? callback() : handleError(res);
  }).catch(function () {
    res.status(400).json({ message: 'You are not authorized to visit this page.' });
  });
};

var skipVerifyJWT = exports.skipVerifyJWT = function skipVerifyJWT(_req, _res, next) {
  next();
};