import sendToQueue from '../services/task_queue';

const generateHandler = (req, res, channel) => {
  res.status(200).json({ message: 'Task created' });
  sendToQueue(req, channel);
};

export default generateHandler;
