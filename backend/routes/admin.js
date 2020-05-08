const router = require('express').Router();
let Admin = require('../models/admin_model');
let Store = require('../models/store_model');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
  Admin.find()
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const prePassword = req.body.password;
  const storeId = req.body.storeId;

  Store.findById(storeId)
    .exec(function (error, store) {
      if (error) {
        return next(error);
      } else {
        if (store === null) {
          var err = new Error('Incorrect Store Id');
          err.status = 400;
          return next(err);
        } else {
          console.log(store);
          //hashing password before saving to database
          bcrypt.hash(prePassword, 10, (err, password) => {
            if (err) {
              console.log(err);
            }
            else {
              let storeName = store.name;
              const newAdmin = new Admin({ email, password, storeId, storeName });
              newAdmin.save()
                .then(() => res.json(`Admin added at ${store.name}`))
                .catch(err => res.status(400).json('Error: ' + err));
            }
          });

        }
      }
    });
});

router.route('/login').post((req, res, next) => {
  const loginEmail = req.body.loginEmail;
  const loginPassword = req.body.loginPassword;
  
  Admin.authenticate(loginEmail, loginPassword, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    } else {
      res.redirect('/admin/setSession?id=' + user._id + '&storeId=' + user.storeId + '&storeName=' + user.storeName);      
    }
  });
});

router.route('/setSession').get((req, res, next) => {  
  let sessionId = req.query.id;
  let storeId = req.query.storeId;
  let storeName = req.query.storeName;
  console.log('SESSION ID: ', sessionId);
  req.session.userId = sessionId;
  req.session.storeId = storeId;
  req.session.storeName = storeName;
  res.send(req.session.userId);
});

router.route('/verifySession').get((req, res, next) => {
  console.log(req.session);
  Admin.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send({adminId: req.session.userId, storeId: req.session.storeId, storeName: req.session.storeName})
        }
      }
    });
});


module.exports = router;
