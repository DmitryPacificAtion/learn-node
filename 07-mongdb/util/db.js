const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://dmytro:Q!w2e3r4@atlascluster.j9lpcso.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function mongoConnect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (error) {
    console.error('Error: ', error);
  }
  // Ensures that the client will close when you finish/error
}

let __db = client.db('shop');

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw Error('No database found!');
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
