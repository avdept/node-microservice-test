import express from 'express';
import bodyParser from 'body-parser';
import * as amqp from 'amqplib/callback_api';

import { verifyJWT } from './app/middleware/access';
import login from './app/controllers/session_controller';
import generateHandler from './app/controllers/tasks_controller';

const app = express();
let channel = null;
let rmqConnection = null;
amqp.connect('amqp://localhost', (err, conn) => {
  rmqConnection = conn;
  conn.createChannel((_err, ch) => {
    channel = ch.assertQueue('tasks', { durable: false });
  });

  conn.createChannel((_err, ch) => {
    channel = ch.assertQueue('completed_tasks', { durable: false });
    // Note: on Node 6 Buffer.from(msg) should be used
    channel.consume('completed_tasks', (msg) => {
      console.log('Received completed task %s', msg.content.toString());
    }, { noAck: true });
  });
});

app.use(bodyParser.json());
app.use('/tasks_generator/create', verifyJWT);
app.post('/sessions/create', login);
app.post('/task_generators/create', (req, res) => { generateHandler(req, res, channel); });


app.listen(3005, () => { console.log('Example app listening on port 3005!'); });


process.on('exit', () => {
  console.log('Closing RMQ connection');
  rmqConnection.close();
});

