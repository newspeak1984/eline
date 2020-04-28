const router = require('express').Router();
let Customer = require('../models/customer_model');
let Store = require('../models/store_model');
const { sendMessage } = require('../sqsQueues');

router.route('/').get((req, res, next) => {
  console.log("session id: ", req.session.userId);
  Customer.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

router.route('/:storeName/add_to_queue').get((req, res) => {
  //get queue url from mongo based on store id
  // send message to the queue

  const storeName = req.params.storeName;
  // TODO: get actual customerId (maybe form state?)
  const customerId = "email@email.com";

  Store.findOne({ name: storeName }, function(err, store) {
    console.log('checking mongo');
    if (err) {
      console.log(err);
    } else {
      if (!store) {
        console.log(`${storeName} does not exist`)
      } else {
        console.log(store.queueUrl);
        sendMessage(store.queueUrl, storeName, customerId);
        // TODO only send on sendMessage success 
        res.send('message sent!');
      }
    }
  })

});

module.exports = router;