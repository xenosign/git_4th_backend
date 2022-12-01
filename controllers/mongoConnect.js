const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err, db) => {
  const users = client.db('kdt4').collection('users');
  users.deleteMany({}, (err) => {
    users.insertMany(
      [
        {
          name: 'pororo',
          age: 5,
        },
        {
          name: 'loopy',
          age: 6,
        },
        {
          name: 'crong',
          age: 4,
        },
      ],
      (err, result) => {
        if (result.acknowledged) {
          users.updateOne(
            {
              name: 'loopy',
            },
            {
              $set: {
                name: '루피',
              },
            },
            (err) => {
              const cursor = users.find({});
              cursor.toArray((err, data) => {
                console.log(data);
              });
            },
          );
        }
      },
    );
  });
});
