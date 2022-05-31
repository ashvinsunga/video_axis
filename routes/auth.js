// Tips: use 'joi-password-complexity' to implement password complexity

// import models
const { User } = require('../models/user');
const { Router } = require('express');
const router = Router();
const lodash = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const result = await User.find().sort('name');
  return res.send(result);
});

// Register information
router.post('/', async (req, res) => {
  // Validate user input
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  // 404 is returned because we don't want  the user to know if the user or password is wrong
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  res.send(true);
});

// Update information
router.put('/:id', async (req, res) => {
  // Validate user input
  const { error } = validate(req.body);
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

const validate = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
};

module.exports = router;
