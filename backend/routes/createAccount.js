const router = require('express').Router();
let Customer = require('../models/customer_model')


router.route('/').post((req, res) => {
  const username = req.body.username;
  const phone = req.body.phone;
  const currentStore = null;

  const newCustomer = new Customer({username, phone, currentStore});

  newCustomer.save()
    .then(() => res.json(`${username} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;