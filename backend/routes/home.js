const router = require('express').Router();
let Customer = require('../models/customer_model');
let Store = require('../models/store_model');
const nodemailer = require("nodemailer");

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(async (user) => {

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
                subject: "eline Notification", // Subject line
                text: "Hi " + user.username + ", it's time to go in!" // plain text body
            }, (error, info) => {
                if(error){
                    console.log(error);
                }
                else{
                    console.log('Email sent: ' + info.response)
                }
            });

            res.json('Email sent!');
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;