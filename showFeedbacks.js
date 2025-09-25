const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');
const User = require('./models/User');

async function showFeedbacks() {
  await mongoose.connect('mongodb://localhost:27017/tourist-feedback');
  const feedbacks = await Feedback.find({}).populate('userId');
  console.log('All feedbacks:', feedbacks);
  await mongoose.disconnect();
}

showFeedbacks();
