const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  status: {
    type: String,
    enum: ['PLACED', 'DELIVERED', 'CANCELLED'],
    default: 'PLACED',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Order = model('Order', orderSchema);

module.exports = {
  Order,
};
