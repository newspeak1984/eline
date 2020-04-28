const router = require('express').Router();
let Store = require('../models/store_model');
let Customer = require('../models/customer_model');

router.route('/').post((req, res, next) => {
  const loginEmail = req.body.loginEmail;
  const loginPassword = req.body.loginPassword;
  
  Customer.authenticate(loginEmail, loginPassword, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.send({
        user: user,
        logingEmail: loginEmail
      });
    }
  });
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const longitude = req.body.longitude;
  const latitude  = req.body.latitude;
  const open = req.body.open;
  const close = req.body.close;

  const newStore = new Store({name, longitude, latitude, open, close});

  newStore.save()
    .then(() => res.json('Store added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;