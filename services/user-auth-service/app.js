const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Change this if needed
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('user_auth');
        const collection = database.collection('users'); // Example collection
        // Perform operations on the collection
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
