// models/order.js
const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  items: [{
    plate: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('Order', OrderSchema);
