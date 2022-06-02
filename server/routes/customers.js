// import models
const { Customer, validateCustomer } = require('../models/customer');

const { Router } = require('express');
const router = Router();
//
const auth = require('../middleware/auth');

// Response statuses
// 200 = Ok
// 400 = Bad Request
// 404 = Not found

// Retrieve information

router.get('/', async (req, res) => {
  const result = await Customer.find().sort('name');
  return res.send(result);
});

// Single document
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send('The Customer was not found with the given ID');
  }
  return res.send(customer);
});

// Register information
router.post('/', auth, async (req, res) => {
  // Validate user input
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  customer = await customer.save();
  return res.send(customer);
});

// Update information
router.put('/:id',auth,  async (req, res) => {
  // Validate user input
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if the id info does exist
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer) {
    return res.status(404).send('The Customer was not found with the given ID');
  }

  // Update the information
  return res.send(customer);
});

// Delete an information
router.delete('/:id', async (req, res) => {
  // Check if the id info does exist
  const customer = await Customer.findByIDAndRemove(req.params.id);
  if (!customer) {
    return res.status(404).send('The Customer was not found with the given ID');
  }

  return res.send(customer);
});

module.exports = router;
