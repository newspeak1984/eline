const router = require('express').Router();
let Store = require('../models/store_model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
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