const express = require('express');
const feedbackController = require('./controllers/feedbackController');
const { validateFeedback } = require('./middleware/validation');

const router = express.Router();
// Feedback APIs
router.post('/feedback',  async (req, res, next) => {
    try {
        const result = await feedbackController.addFeedback(req);
        if (result === "Please Contact Admin") {
            return res.status(403).json({ error: result });
        }
        if (result === "Validation error") {
            return res.status(400).json({ error: result });
        }
        res.status(201).json({ success: true, message: 'Feedback submitted successfully.', data: result });
    } catch (error) {
        next(error);
    }
});

router.get('/feedback', async (req, res, next) => {
    try {
        const { userId, destinationType, destinationName } = req.query;
        const feedback = await feedbackController.getUserFeedback({ userId, destinationType, destinationName });
        if (!feedback) {
            return res.status(404).json({ error: 'No completed feedback found for this user and destination.' });
        }
        res.json(feedback);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
