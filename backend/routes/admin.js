const router = require('express').Router();
const { receiveMessage, deleteMessage } = require('../sqsQueues');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_next').get(async (req, res) => {
  const queueUrl = req.body.queueUrl;

  receiveMessage(queueUrl, (data) => {
    console.log('retrieving front of queue', data);
    if (data) {
      deleteMessage(queueUrl, data, (success) => {
        if (success) {
          res.send(data.Messages[0].Body);
        } else {
          res.status(500).send('Failed to delete message');
        }
      });
    } else {
      res.status(500).send('Failed to recieve message');
    }
  });
});

module.exports = router;
