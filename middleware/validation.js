// Validation middleware for feedback
const validateFeedback = (req, res, next) => {
    const { body } = req;
    
    // Check if body exists
    if (!body) {
        return res.status(400).json({ 
            error: 'Validation error: Request body is required' 
        });
    }

    // If body is a string, it might be base64 encoded
    if (typeof body === 'string') {
        try {
            // Try to decode base64
            let decoded;
            if (typeof Buffer !== 'undefined') {
                decoded = Buffer.from(body, 'base64').toString('utf-8');
            } else {
                decoded = atob(body);
            }
            const parsed = JSON.parse(decoded);
            req.body = parsed;
        } catch (error) {
            return res.status(400).json({ 
                error: 'Validation error: Invalid data format' 
            });
        }
    }

    // Validate required fields
    const requiredFields = [ 'travelDate', 'YTMOTID', 'userName', 'destinationName'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    console.log(missingFields, req.body)
    if (missingFields.length > 0) {
        return res.status(400).json({ 
            error: `Validation error: Missing required fields: ${missingFields.join(', ')}` 
        });
    }

    // Validate rating
    if (req.body.rating < 1 || req.body.rating > 5) {
        return res.status(400).json({ 
            error: 'Validation error: Rating must be between 1 and 5' 
        });
    }

    // Validate destination type
    if (!['hotel', 'city'].includes(req.body.destinationType)) {
        return res.status(400).json({ 
            error: 'Validation error: destinationType must be "hotel" or "city"' 
        });
    }

    // Validate travel date
    const travelDate = new Date(req.body.travelDate);
    if (isNaN(travelDate.getTime())) {
        return res.status(400).json({ 
            error: 'Validation error: Invalid travel date format' 
        });
    }

    // Validate optional fields if provided
    if (req.body.visitAgain !== undefined && (req.body.visitAgain < 0 || req.body.visitAgain > 5)) {
        return res.status(400).json({ 
            error: 'Validation error: visitAgain must be between 0 and 5' 
        });
    }

    if (req.body.recommend !== undefined && (req.body.recommend < 0 || req.body.recommend > 5)) {
        return res.status(400).json({ 
            error: 'Validation error: recommend must be between 0 and 5' 
        });
    }

    next();
};

module.exports = {
    validateFeedback
};
