# YT Tourism Backend API

A Node.js backend API for tourism feedback management with comprehensive validation.

## Features

- ✅ **Feedback Management**: Create and retrieve tourism feedback
- ✅ **Validation**: Comprehensive input validation with detailed error messages
- ✅ **MongoDB Integration**: Persistent data storage with Mongoose
- ✅ **Error Handling**: Robust error handling and logging
- ✅ **CORS Support**: Cross-origin resource sharing enabled
- ✅ **Vercel Ready**: Optimized for Vercel deployment

## API Endpoints

### POST /api/feedback
Create new feedback entry.

**Request Body:**
```json
{
  "secretKey": "YATRA_FEEDBACK",
  "rating": 4,
  "destinationType": "hotel",
  "travelDate": "2024-01-15",
  "YTMOTID": "TEST123",
  "userName": "John Doe",
  "destinationName": "Test Hotel",
  "visitAgain": 4,
  "recommend": 5,
  "feedbackAreas": ["service", "cleanliness"],
  "suggestion": "Great service!",
  "othertext": "Additional comments"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback submitted successfully.",
  "data": { ... }
}
```

### GET /api/feedback
Retrieve feedback for a user and destination.

**Query Parameters:**
- `userId`: User ID
- `destinationType`: Type of destination (hotel/city)
- `destinationName`: Name of the destination

## Validation Rules

- **rating**: Must be between 1 and 5
- **destinationType**: Must be "hotel" or "city"
- **travelDate**: Must be a valid date format
- **visitAgain**: Optional, must be between 0 and 5
- **recommend**: Optional, must be between 0 and 5
- **Required fields**: rating, destinationType, travelDate, YTMOTID, userName, destinationName

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=YATRA_FEEDBACK
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp env.example .env
# Edit .env with your actual values
```

3. Start development server:
```bash
npm run dev
```

## Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
- `MONGO_URI`: Your MongoDB connection string
- `SECRET_KEY`: Your secret key for API authentication

## Project Structure

```
├── controllers/          # Route controllers
├── middleware/          # Custom middleware
│   ├── errorHandler.js  # Error handling middleware
│   └── validation.js    # Input validation middleware
├── models/              # Database models
│   └── Feedback.js      # Feedback schema
├── services/            # Business logic
│   └── feedbackService.js
├── route.js             # API routes
├── server.js            # Main server file
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and scripts
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `403`: Forbidden (invalid secret key)
- `404`: Not Found
- `500`: Internal Server Error

## Testing

Run the validation test script:
```bash
node test-validation.js
```

## License

ISC
