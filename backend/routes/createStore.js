const { createQueue } = require("../sqsQueues");
const router = require("express").Router();
let Store = require("../models/store_model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const open = req.body.open;
  const close = req.body.close;
  // TODO: make sure the mongo record is successfully made before creating queue
  // TODO: add unique name to the queue name to handle chains

  // TODO: maybe don't do this automatically
  // TODO: secure this endpoint
  createQueue(name, (data) => {
    console.log('creating queue', data);
    let queueUrl = data.QueueUrl;
    const newStore = new Store({
      name,
      longitude,
      latitude,
      open,
      close,
      queueUrl
    });
    newStore
      .save()
      .then(() => res.json("Store added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
