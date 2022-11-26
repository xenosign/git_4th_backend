const connection = require('./dbConnect');

const db = {
  getAllArticles: (cb) => {
    connection.query('SELECT * FROM mydb1.board;', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  getArticle: (id, cb) => {
    connection.query(
      `SELECT * FROM mydb1.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  writeArticle: (newArticle, cb) => {
    connection.query(
      `INSERT INTO mydb1.board (TITLE, CONTENT) VALUES ('${newArticle.title}', '${newArticle.content}')`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  modifyArticle: (id, modifyArticle, cb) => {
    connection.query(
      `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
  deleteArticle: (id, cb) => {
    connection.query(
      `DELETE FROM mydb1.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = db;
