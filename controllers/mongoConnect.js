const { MongoClient, ServerApiVersion } = require('mongodb');

// eslint-disable-next-line operator-linebreak
const uri = process.env.MDB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
