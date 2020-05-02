const router = require("express").Router();
let Store = require("../models/store_model");
let server = require('../server');

router.route("/").get((req, res) => {
  Store.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const open = req.body.open;
  const close = req.body.close;

  const newStore = new Store({
    name,
    longitude,
    latitude,
    open,
    close,
  });

  newStore
    .save()
    .then((store) => {
      server.addStore(store.name, store._id);
      server.print();
      res.json("Store added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req, res) => {
  Store.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
