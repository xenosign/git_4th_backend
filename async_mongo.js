// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function main() {
  await client.connect();
  const users = client.db('kdt4').collection('user');
  await users.deleteMany({});

  await users.insertMany([
    {
      id: 'tetz',
      name: '이효석',
      isMarried: false,
      age: 38,
    },
    {
      id: 'eric',
      name: '김성재',
      isMarried: true,
      age: 38,
    },
    {
      id: 'ailee',
      name: '이재연',
      isMarried: false,
      age: 35,
    },
    {
      id: 'alex',
      name: '하승호',
      isMarried: false,
      age: 34,
    },
    {
      id: 'uncle',
      name: '박동희',
      isMarried: true,
      age: 38,
    },
    {
      id: 'ted',
      name: '방성민',
      isMarried: false,
      age: 37,
    },
  ]);

  await users.updateMany(
    {},
    {
      $set: { updateTime: new Date(Date.now()) },
    },
  );

  const dataCursor = users.find({});
  const data = await dataCursor.toArray();
  console.log(data);
  await client.close();
}
main();
