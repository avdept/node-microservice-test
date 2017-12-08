'use strict';

var _callback_api = require('amqplib/callback_api');

var amqp = _interopRequireWildcard(_callback_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

amqp.connect('amqp://localhost', function (err, conn) {
  conn.createChannel(function (_err, ch) {
    ch.assertQueue('tasks', { durable: false });
    ch.consume('tasks', function (msg) {
      console.log("Received %s, putting it to completed_tasks", msg.content.toString());
      ch.sendToQueue('completed_tasks', Buffer.from(msg.content.toString()));
    }, { noAck: true });
  });
});