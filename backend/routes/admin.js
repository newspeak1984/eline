const router = require('express').Router();
const { recieveAndDeleteMessage } = require('../sqsQueues');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_next').get((req, res) => {
  // receive and delete message
  // if success, then return some customer identifier (message.customer)
  const queueUrl = req.body.queueUrl;

  recieveAndDeleteMessage(queueUrl, (data) => {
    console.log('retriving front of queue', data);
    
  });
  
});


module.exports = router;
