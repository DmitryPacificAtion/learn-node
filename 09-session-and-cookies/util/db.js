const { MongoClient } = require('mongodb');

// Connection URI
const uri =
  'mongodb+srv://root:Q!w2e3r4@cluster0.laev3.mongodb.net/Cluster0?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri);

async function mongoConnect(callback) {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    callback();
  } catch (error) {
    console.error(error);
    // await client.close();
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   console.log('client', client);
  }
}

const getDB = async () => {
  // Establish and verify connection
  return client.db();
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
