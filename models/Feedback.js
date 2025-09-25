const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  rating: { type: Number, min: 1, max: 5, required: true },
  destinationType: { type: String, enum: ['hotel', 'city'], required: true },
  completed: { type: Boolean, default: false },
  travelDate: { type: String, required: true },
  YTMOTID: { type: String, required: true },
  userName :  {type: String, required: true},
  destinationName: { type: String, required: true },
  visitAgain: { type: Number, min: 0, max: 5, required: false, default: 0 },
  recommend: { type: Number, min: 0, max: 5, required: false, default: 0 },
  feedbackAreas: [{ type: String }],
  suggestion: { type: String },
  othertext: { type: String },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('feedbacks', feedbackSchema);
