const router = require('express').Router();
let Customer = require('../models/customer_model');
let Store = require('../models/store_model');
const { sendMessage } = require('../sqsQueues');

router.route('/').get((req, res, next) => {
  
});

router.route('/:storeName/add_to_queue').get((req, res) => {
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