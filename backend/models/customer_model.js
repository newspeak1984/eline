const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: { type: String, required: true },
  currentStore: { type: String, required: false },
}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;