// @ts-check
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri =
  'mongodb+srv://tetz:qwer1234@cluster0.sdiakr0.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const user = client.db('kdt-test').collection('test');

  user.deleteMany({}, (err, deleteResult) => {
    if (deleteResult?.acknowledged) {
      user.insertMany(
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
        (err, insertResult) => {
          if (insertResult?.acknowledged) {
            user.updateMany(
              {
                age: { $gte: 5 },
              },
              {
                $set: {
                  name: '5살 이상',
                },
              },
              (err, deleteResult2) => {
                if (deleteResult2?.acknowledged) {
                  const findDataCursor = user.find({});
                  findDataCursor.toArray((err, data) => {
                    console.log(data);
                    client.close();
                  });
                }
              },
            );
          }
        },
      );
    }
  });
});
