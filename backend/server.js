require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const txnRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI not set. Set it in .env file.");
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', txnRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send({status: 'ok'}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
