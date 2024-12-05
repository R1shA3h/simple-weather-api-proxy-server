const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const errorHandler = require('./middleware/error');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] IP: ${req.ip} - URL: ${req.originalUrl}`);
  next();
});

// Rate limiting with environment variables
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 60 * 1000, // Default: 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 5, // Default: 5 requests
  handler: (req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] IP: ${req.ip} - Rate limit exceeded`);
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  },
});
app.use(limiter);
app.set('trust proxy', 1);

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api', require('./routes'));

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
