// Tips: use 'joi-password-complexity' to implement password complexity

// import models
const { User, validateUser } = require('../models/user');
const { Router } = require('express');
const router = Router();
const lodash = require('lodash');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const result = await User.find().sort('name');
  return res.send(result);
});

// Register information
router.post('/', async (req, res) => {
  // Validate user input
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(lodash.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  // IEP - Information Expert Principle
  const token = user.generateAuthToken();
  return res
    .header('x-auth-token', token)
    .send(lodash.pick(user, ['_id', 'name', 'email']));
});

// Update information
router.put('/:id', async (req, res) => {
  // Validate user input
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if the id info does exist
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).send('The user was not found with the given ID');
  }

  // Update the information
  return res.send(user);
});

// Delete an information
router.delete('/:id', async (req, res) => {
  // Check if the id info does exist
  const user = await User.findByIDAndRemove(req.params.id);
  if (!user) {
    return res.status(404).send('The user was not found with the given ID');
  }

  return res.send(user);
});

module.exports = router;
