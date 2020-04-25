const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: { type: String, required: true },
  longitude: { type: Schema.Types.Decimal128, required: true },
  latitude: { type: Schema.Types.Decimal128, required: true },
  open: { type: Number, required: true },
  close: { type: Number, required: true}
}, {
  timestamps: true,
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
