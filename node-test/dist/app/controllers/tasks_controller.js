'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task_queue = require('../services/task_queue');

var _task_queue2 = _interopRequireDefault(_task_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateHandler = function generateHandler(req, res, channel) {
  res.status(200).json({ message: 'Task created' });
  (0, _task_queue2.default)(req, channel);
};

exports.default = generateHandler;