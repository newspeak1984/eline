const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true, dropDups: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true},
  phone: { type: Number, unique: true, required: true, dropDups: true },
  reset_password_token: { type: String, unique: true, required: false},
  reset_password_expires: { type: Date, unique: false, required: false}
}, {
  timestamps: true,
});

//authenticate login input against database
customerSchema.statics.authenticate = function (email, password, callback) {
  Customer.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;