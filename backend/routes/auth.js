const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// register
router.post('/register', async (req, res) => {
  try {
    const {name,email,password,role} = req.body;
    if (!email || !password || !name) return res.status(400).json({error:'Missing fields'});
    const existing = await User.findOne({email});
    if (existing) return res.status(400).json({error:'Email already registered'});
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({name,email,password:hashed,role});
    const token = jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn:'7d'});
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}, token});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const {email,password} = req.body;
    if (!email || !password) return res.status(400).json({error:'Missing fields'});
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({error:'Invalid credentials'});
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({error:'Invalid credentials'});
    const token = jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn:'7d'});
    res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}, token});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
