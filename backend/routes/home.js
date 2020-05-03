const router = require('express').Router();
let Customer = require('../models/customer_model');
let Store = require('../models/store_model');

router.route('/').get((req, res, next) => {
  
});

module.exports = router;