const sendToQueue = (req, channel) => {
  channel.sendToQueue('tasks', Buffer.from(JSON.stringify(req.body.task)));
};

export default sendToQueue;
