const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  origin: {
    address: String,
    city: String,
    country: String,
    zipCode: String
  },
  destination: {
    address: String,
    city: String,
    country: String,
    zipCode: String
  },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'delivered', 'delayed', 'cancelled'],
    default: 'pending'
  },
  weight: {
    value: Number,
    unit: String // kg, lbs
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: String // cm, inches
  },
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'overnight'],
    default: 'standard'
  },
  cost: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  notes: String
});

module.exports = mongoose.model('Shipment', shipmentSchema);
