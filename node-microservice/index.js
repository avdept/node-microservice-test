import * as amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((_err, ch) => {
    ch.assertQueue('tasks', { durable: false });
    ch.consume('tasks', (msg) => {
      console.log("Received %s, putting it to completed_tasks", msg.content.toString());
      ch.sendToQueue('completed_tasks', Buffer.from(msg.content.toString()))
    }, {noAck: true});
  });
});