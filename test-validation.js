// Test script to verify validation is working
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const validFeedback = {
    secretKey: "YATRA_FEEDBACK",
    rating: 4,
    destinationType: "hotel",
    travelDate: "2024-01-15",
    YTMOTID: "TEST123",
    userName: "John Doe",
    destinationName: "Test Hotel",
    visitAgain: 4,
    recommend: 5,
    feedbackAreas: ["service", "cleanliness"],
    suggestion: "Great service!",
    othertext: "Additional comments"
};

const invalidFeedback = {
    secretKey: "YATRA_FEEDBACK",
    rating: 6, // Invalid rating
    destinationType: "invalid", // Invalid destination type
    travelDate: "invalid-date", // Invalid date
    YTMOTID: "TEST123",
    userName: "John Doe",
    destinationName: "Test Hotel"
};

const missingFieldsFeedback = {
    secretKey: "YATRA_FEEDBACK",
    rating: 4,
    // Missing required fields
};

async function testValidation() {
    console.log('Testing validation...\n');

    try {
        // Test 1: Valid feedback
        console.log('Test 1: Valid feedback');
        const response1 = await axios.post(`${BASE_URL}/feedback`, validFeedback);
        console.log('✅ Valid feedback accepted:', response1.status);
        console.log('Response:', response1.data);
    } catch (error) {
        console.log('❌ Valid feedback failed:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    try {
        // Test 2: Invalid feedback
        console.log('Test 2: Invalid feedback (rating > 5)');
        const response2 = await axios.post(`${BASE_URL}/feedback`, invalidFeedback);
        console.log('❌ Invalid feedback was accepted (this should not happen)');
    } catch (error) {
        console.log('✅ Invalid feedback rejected:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    try {
        // Test 3: Missing fields
        console.log('Test 3: Missing required fields');
        const response3 = await axios.post(`${BASE_URL}/feedback`, missingFieldsFeedback);
        console.log('❌ Missing fields feedback was accepted (this should not happen)');
    } catch (error) {
        console.log('✅ Missing fields feedback rejected:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    try {
        // Test 4: Wrong secret key
        console.log('Test 4: Wrong secret key');
        const wrongKeyFeedback = { ...validFeedback, secretKey: "WRONG_KEY" };
        const response4 = await axios.post(`${BASE_URL}/feedback`, wrongKeyFeedback);
        console.log('❌ Wrong secret key was accepted (this should not happen)');
    } catch (error) {
        console.log('✅ Wrong secret key rejected:', error.response?.data || error.message);
    }
}

// Run tests if server is running
testValidation().catch(console.error);
