'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _callback_api = require('amqplib/callback_api');

var amqp = _interopRequireWildcard(_callback_api);

var _access = require('./app/middleware/access');

var _session_controller = require('./app/controllers/session_controller');

var _session_controller2 = _interopRequireDefault(_session_controller);

var _tasks_controller = require('./app/controllers/tasks_controller');

var _tasks_controller2 = _interopRequireDefault(_tasks_controller);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var channel = null;
var rmqConnection = null;
amqp.connect('amqp://localhost', function (err, conn) {
  rmqConnection = conn;
  conn.createChannel(function (_err, ch) {
    channel = ch.assertQueue('tasks', { durable: false });
  });

  conn.createChannel(function (_err, ch) {
    channel = ch.assertQueue('completed_tasks', { durable: false });
    // Note: on Node 6 Buffer.from(msg) should be used
    channel.consume('completed_tasks', function (msg) {
      console.log('Received completed task %s', msg.content.toString());
    }, { noAck: true });
  });
});

app.use(_bodyParser2.default.json());
app.use('/generate', _access.verifyJWT);
app.post('/login', _session_controller2.default);
app.post('/generate', function (req, res) {
  (0, _tasks_controller2.default)(req, res, channel);
});

app.listen(3005, function () {
  console.log('Example app listening on port 3005!');
});

process.on('exit', function () {
  console.log('Closing RMQ connection');
  rmqConnection.close();
});