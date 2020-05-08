const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: { type: String, unique: true, required: true, trim: true, dropDups: true },
  password: { type: String, required: true},
  storeId: { type: String, required: true, trim: true },
  storeName: { type: String, required: true},
}, {
  timestamps: true,
});

//authenticate login input against database
adminSchema.statics.authenticate = function (email, password, callback) {
  Admin.findOne({ email: email })
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;