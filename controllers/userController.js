// @ts-check
const mongoClient = require('./mongoConnect');

const db = {
  userCheck: async (userId) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const findUser = await user.findOne({ id: userId });
    if (!findUser) return false;
    return findUser;
  },
  registerUser: async (newUser) => {
    const client = await mongoClient.connect();
    const user = client.db('kdt4').collection('user');

    const insertResult = await user.insertOne(newUser);
    if (!insertResult.acknowledged) throw new Error('회원 등록 실패');
    return true;
  },
};

module.exports = db;

// const connection = require('./dbConnect');

// const db = {
//   userCheck: (userId, cb) => {
//     connection.query(
//       `SELECT * FROM mydb1.user WHERE USERID = '${userId}';`,
//       (err, data) => {
//         if (err) throw err;
//         console.log(data);
//         cb(data);
//       },
//     );
//   },
//   registerUser: (newUser, cb) => {
//     connection.query(
//       `INSERT INTO mydb1.user (USERID, PASSWORD) VALUES ('${newUser.id}', '${newUser.password}');`,
//       (err, data) => {
//         if (err) throw err;
//         console.log(data);
//         cb(data);
//       },
//     );
//   },
// };
