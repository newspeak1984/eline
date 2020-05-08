const router = require('express').Router();
let Customer = require('../models/customer_model');
const nodemailer = require("nodemailer");
const async = require('async');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

router.route('/').post((req, res, next) => {
  const loginEmail = req.body.loginEmail;
  const loginPassword = req.body.loginPassword;

  Customer.authenticate(loginEmail, loginPassword, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      res.redirect('/login/setSession?id=' + user._id + '&email=' + user.email);      
    }
  });
});

router.route('/setSession').get((req, res, next) => {  
    let sessionId = req.query.id;
    let email = req.query.email;
    console.log('SESSION ID: ', sessionId);
    req.session.userId = sessionId;
    req.session.email = email;
    res.send(req.session.userId);
});

router.route('/verifySession').get((req, res, next) => {
  // console.log(req.session);
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
          return res.send({userId: req.session.userId, email: req.session.email})
        }
      }
    });
});

router.route('/forgotPassword').post((req, res, next) => {
  async.waterfall([
    function (done) {
      Customer.findOne({
        email: req.body.email
      }).exec(function (err, user) {
        if (user) {
          done(err, user);
        } else {
          done('User not found.');
        }
      });
    },
    function (user, done) {
      // create the random token
      crypto.randomBytes(20, function (err, buffer) {
        var token = buffer.toString('hex');
        done(err, user, token);
      });
    },
    function (user, token, done) {
      console.log(token);
      Customer.findOneAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { useFindAndModify: false, upsert: true, returnOriginal: false }).exec(function (err, new_user) {
        done(err, token, new_user);
      });
    },
    function (token, user, done) {
      let url = 'http://localhost:3000/login/resetPassword?token=' + token

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'elinenoreply@gmail.com',
          pass: process.env.emailPassword
        }
      });

      transporter.sendMail({
        from: 'elinenoreply@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "eline Passsword Reset", // Subject line
        html: '<p>You requested for a password reset, kindly use this <a href=' + url + '>link</a> to reset your password</p>'
      }, (error, info) => {
        if (error) {
          res.json(error);
        }
        else {
          res.json("Recovery email sent")
        }
      });
    }
  ], function (err) {
    return res.status(422).json({ message: err });
  });

})

router.route('/resetPassword').post((req, res, next) => {
  Customer.findOne({
    reset_password_token: req.query.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function (err, user) {
    if (!err && user) {
      bcrypt.hash(req.body.newPassword, 12, (err, password) => {
        if (err) {
          console.log(err);
        }
        else {
          user.password = password;
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function(err){
            if(err){
              return res.status(422).send({
                message: err
              });
            }
            else{
              return res.status(200).send({
                message: 'Updated Password Successfully'
              });
            }
          })
        }
      });
    }
    else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.'
      });
    }
  })
})

module.exports = router;