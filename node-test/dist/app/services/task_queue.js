'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sendToQueue = function sendToQueue(req, channel) {
  channel.sendToQueue('tasks', Buffer.from(JSON.stringify(req.body.task)));
};

exports.default = sendToQueue;