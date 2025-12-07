const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.authenticate = async (req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({error:'No token'});
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    if (!req.user) return res.status(401).json({error:'Invalid token'});
    next();
  } catch (err) {
    return res.status(401).json({error:'Token invalid or expired'});
  }
};

exports.authorizeRoles = (...allowed) => (req, res, next) => {
  if (!req.user) return res.status(401).json({error:'Not authenticated'});
  if (!allowed.includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  next();
};
