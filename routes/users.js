// import models
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();

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

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user = await user.save();
  return res.send(user);
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
