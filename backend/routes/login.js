const router = require('express').Router();
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
      res.redirect('/login/setSession?id=' + user._id);      
    }
  });
});

router.route('/setSession').get((req, res, next) => {  
    let sessionId = req.query.id;
    console.log('SESSION ID: ', sessionId);
    req.session.userId = sessionId;
    res.send(req.session.userId);
});

router.route('/verifySession').get((req, res, next) => {
  console.log(req.session);
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
          return res.send('Session is active')
        }
      }
    });
});

module.exports = router;