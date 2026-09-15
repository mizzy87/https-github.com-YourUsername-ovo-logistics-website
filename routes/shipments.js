const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('customerId');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shipment by tracking number
router.get('/:trackingNumber', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingNumber: req.params.trackingNumber
    }).populate('customerId');
    
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new shipment
router.post('/', async (req, res) => {
  try {
    const shipment = new Shipment(req.body);
    const savedShipment = await shipment.save();
    res.status(201).json(savedShipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update shipment
router.put('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(shipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete shipment
router.delete('/:id', async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shipment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
