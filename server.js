require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ajaysharma2_db_user:FqVarmxUz0xYm2ZA@tourist-feedback.vresbil.mongodb.net/?retryWrites=true&w=majority&appName=tourist-feedback';
const mainRouter = require('./route');

const app = express();

// Enhanced CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all origins in development
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, you can specify allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://yatra-tourist-feedback.vercel.app'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now - you can restrict this later
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'YT Tourism Backend API is running',
    version: '1.0.0',
    endpoints: {
      feedback: '/api/feedback'
    }
  });
});

app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose!");
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Export for Vercel
module.exports = app;

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}