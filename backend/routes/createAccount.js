const router = require('express').Router();
let Customer = require('../models/customer_model')


router.route('/').post((req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;
  const currentStore = req.body.currentStore;

  const newCustomer = new Customer({email, username, password, phone, currentStore});

  newCustomer.save()
    .then(() => res.json(`${username} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;