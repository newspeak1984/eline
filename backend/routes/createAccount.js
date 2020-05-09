const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
let Customer = require('../models/customer_model');
const bcrypt = require('bcryptjs');

router.post('/', [
  check('email').exists().isEmail().trim().escape(),
  check('username').exists().trim().escape().isLength({max: 20}),
  check('phone').exists().isNumeric().trim().escape().isLength({min: 9}),
  check('password').exists().isLength({min: 6})
],(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

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