const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// Admin only: list users
router.get('/', authenticate, authorizeRoles('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = router;
