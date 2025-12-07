const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy API requests to backend
app.use('/api', createProxyMiddleware({
  target: process.env.VITE_API_URL || 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
  console.log(`API proxy target: ${process.env.VITE_API_URL || 'http://localhost:5000'}`);
});
