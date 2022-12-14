// @ts-check
const connect = require('./mongooseConnect');
const User = require('../models/user');

connect();

const db = {
  userCheck: async (userId) => {
    try {
      const findUser = await User.findOne({ id: userId });
      console.log(findUser);
      if (!findUser) return false;
      return findUser;
    } catch (err) {
      console.error(err);
      return { status: 'unexpected', err };
    }
  },
  registerUser: async (newUser) => {
    try {
      const insertResult = await User.create(newUser);
      if (!insertResult) throw new Error('회원 등록 실패');
      return { status: 'success' };
    } catch (err) {
      console.error(err);
      if (err.code === 11000) return { status: 'duplicated' };
      return { status: 'unexpected', err };
    }
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
