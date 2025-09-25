const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://ajaysharma2_db_user:FqVarmxUz0xYm2ZA@tourist-feedback.vresbil.mongodb.net/?retryWrites=true&w=majority&appName=tourist-feedback';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function seed() {
  try {
    await client.connect();
    const db = client.db('tourist-feedback');

    // const usersCol = db.collection('users');
    const feedbackCol = db.collection('feedbacks');

    // await usersCol.deleteMany({});
    await feedbackCol.deleteMany({});

    // const users = await usersCol.insertMany([
    //   { name: 'Alice', email: 'alice@example.com' },
    //   { name: 'Bob', email: 'bob@example.com' },
    // ]);
    // const userIds = Object.values(users.insertedIds);

    await feedbackCol.insertMany([
      {
        // userId: '122234',
        rating: 5,
        destinationType: 'city',
        destinationName: 'Kolkata',
        visitAgain: 2,
        recommend: 1,
        feedbackAreas: ['Overcrowding'],
        suggestion: 'Less crowd management needed.',
        othertext: '',
        completed: true,
        createdAt: new Date(),
      },
      {
        // userId: '1225756234',
        rating: 3,
        destinationType: 'hotel',
        destinationName: 'Grand Hotel',
        visitAgain: 4,
        recommend: 5,
        completed: true,
        createdAt: new Date(),
      },
      {
        // userId: '18989225',
        rating: 2,
        destinationType: 'hotel',
        destinationName: 'Budget Inn',
        visitAgain: 1,
        recommend: 1,
        feedbackAreas: ['Poor Quality and low service standards'],
        suggestion: 'Better staff training.',
        othertext: 'Staff was not helpful.',
        completed: false,
        createdAt: new Date(),
      },
    ]);

    console.log('Mock data inserted!');
  } finally {
    await client.close();
  }
}

seed();
