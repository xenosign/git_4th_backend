const { MongoClient, ServerApiVersion } = require('mongodb');

// eslint-disable-next-line operator-linebreak
const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
