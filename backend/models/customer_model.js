const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true, dropDups: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true},
  phone: { type: String, unique: true, required: true, dropDups: true },
  currentStore: { type: String, required: false },
}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;