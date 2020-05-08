const router = require('express').Router();
let Customer = require('../models/customer_model');

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(async (user) => {
            res.json({
                "email": user.email,
                "username": user.username,
                "phone": user.phone

            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;