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
  res.send('API is running');
});

app.use(errorHandler);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });