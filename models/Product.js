const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    trackerId: {
      type: String
    },
    status: {
      type: Array,
      default: 'processing'
    },
    start: {
      type: String
    },
    end: {
      type: String
    },
    item: {
      type: String
    },
    packageForm: {
      type: String
    },
    weight: {
      type: String
    },
    quantity: {
      type: String
    },
    mode: {
      type: String
    },
    name: {
      type: String
    },
    addressFrom: {
      type: String
    },
    addressTo: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
