const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { authenticate, authorizeRoles } = require('../middleware/auth');

// GET - list transactions (all roles can access)
router.get('/', authenticate, async (req, res) => {
  const userId = req.user._id;
  try {
    const txns = await Transaction.find({ user: userId }).sort({date:-1});
    res.json(txns);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// POST - add transaction (admin and user)
router.post('/', authenticate, authorizeRoles('admin','user'), async (req, res) => {
  try {
    const payload = {...req.body, user: req.user._id};
    const txn = await Transaction.create(payload);
    res.status(201).json(txn);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

// PUT - update (admin and user)
router.put('/:id', authenticate, authorizeRoles('admin','user'), async (req, res) => {
  try {
    const txn = await Transaction.findById(req.params.id);
    if (!txn) return res.status(404).json({error:'Transaction not found'});
    if (String(txn.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({error:'Forbidden'});
    }
    Object.assign(txn, req.body);
    await txn.save();
    res.json(txn);
  } catch (err) { res.status(500).json({error: err.message}); }
});

// DELETE - delete (admin and user)
router.delete('/:id', authenticate, authorizeRoles('admin','user'), async (req, res) => {
  try {
    const txn = await Transaction.findById(req.params.id);
    if (!txn) return res.status(404).json({error:'Transaction not found'});
    if (String(txn.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({error:'Forbidden'});
    }
    await txn.remove();
    res.json({success:true});
  } catch (err) { res.status(500).json({error: err.message}); }
});

module.exports = router;
