const router = require('express').Router();
let Customer = require('../models/customer_model');
const bcrypt = require('bcryptjs');


router.route('/').post((req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const prePassword = req.body.password;
  const phone = req.body.phone;

  //hashing password before saving to database
  bcrypt.hash(prePassword, 12, (err, password) => {
    if (err) {
      console.log(err);
    }
    else {
      const newCustomer = new Customer({ email, username, password, phone });
      newCustomer.save()
        .then(() => res.json(`${username} added!`))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});

module.exports = router;