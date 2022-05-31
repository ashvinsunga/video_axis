// Tips: use 'joi-password-complexity' to implement password complexity

// import models
const { User } = require('../models/user');

// import third party modules
const { Router } = require('express');
const router = Router();
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

  // IEP - Information Expert Principle
  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
};

module.exports = router;
