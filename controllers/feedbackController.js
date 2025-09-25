const feedbackService = require('../services/feedbackService');

async function addFeedback(feedbackData) {
  return feedbackService.addFeedback(feedbackData);
}

async function getUserFeedback(query) {
  return feedbackService.getUserFeedback(query);
}

module.exports = {
  addFeedback,
  getUserFeedback,
};

