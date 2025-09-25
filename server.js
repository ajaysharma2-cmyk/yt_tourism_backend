require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ajaysharma2_db_user:FqVarmxUz0xYm2ZA@tourist-feedback.vresbil.mongodb.net/?retryWrites=true&w=majority&appName=tourist-feedback';
const mainRouter = require('./route');

const app = express();

app.use(cors());
app.use(express.json());

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