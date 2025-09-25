const Feedback = require('../models/Feedback');
const KEY = "YATRA_FEEDBACK"
// Create feedback for a user
const addFeedback = async (req) => {
    try {
        const payload = req.body.body;
        console.log('Received data:', payload);

        // Check secret key
        if (payload.secretKey !== KEY) {
            return "Please Contact Admin";
        }

        console.log("Validated payload:", payload);
        
        const feedback = new Feedback(payload);
        return await feedback.save();
    } catch (error) {
        console.error('Service error:', error);
        throw error;
    }
};

// Get feedback for a user and destination (hotel/city), only if travel is completed
const getUserFeedback = async ({ userId, destinationType, destinationName }) => {
    const feedback = await Feedback.findOne({
        userId,
        destinationType,
        destinationName,
        completed: true,
    });
    if (!feedback) return null;
    return {
        destinationType: feedback.destinationType,
        destinationName: feedback.destinationName,
    };
};

module.exports = {
    addFeedback,
    getUserFeedback,
};