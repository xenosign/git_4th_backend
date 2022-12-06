// @ts-check
const { ObjectId } = require('mongodb');
const mongoClient = require('./mongoConnect');

const db = {
  getAllArticles: async () => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const AllArticlesCursor = board.find({});
    const AllArticles = await AllArticlesCursor.toArray();
    return AllArticles;
  },
  getArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const findArticle = await board.findOne({ _id: ObjectId(id) });
    if (!findArticle) return false;
    return findArticle;
  },
  writeArticle: async (newArticle) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const writeResult = await board.insertOne(newArticle);
    if (!writeResult.acknowledged) throw new Error('게시글 추가 실패');
    return true;
  },
  modifyArticle: async (id, modifyArticle, img) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const finalModifyArticle = {
      TITLE: modifyArticle.title,
      CONTENT: modifyArticle.content,
    };

    if (img !== null) finalModifyArticle.IMAGE = img;

    const updateResult = await board.updateOne(
      { _id: ObjectId(id) },
      { $set: finalModifyArticle },
    );
    if (!updateResult.acknowledged) throw new Error('수정 실패');
    return true;
  },
  deleteArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db('kdt4').collection('board');

    const deleteResult = await board.deleteOne({ _id: ObjectId(id) });

    if (!deleteResult.acknowledged) throw new Error('삭제 실패');
    return true;
  },
};

module.exports = db;
