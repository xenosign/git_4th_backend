const express = require('express');
const db = require('../controllers/boardController');

const router = express.Router();

function isLogin(req, res, next) {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.send('로그인 해주세요.<br><a href="/login">로그인 페이지로 이동</a>');
  }
}

router.get('/', isLogin, async (req, res) => {
  const ARTICLE = await db.getAllArticles();
  const articleCounts = ARTICLE.length;
  res.render('dbBoard', {
    ARTICLE,
    articleCounts,
    userId: req.session.userId,
  });
});

router.get('/getAll', (req, res) => {
  db.getAllArticles((data) => {
    res.send(data);
  });
});

router.get('/write', isLogin, (req, res) => {
  res.render('dbBoard_write');
});

router.post('/write', isLogin, async (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      USERID: req.session.userId,
      TITLE: req.body.title,
      CONTENT: req.body.content,
    };
    const writeResult = await db.writeArticle(newArticle);
    if (writeResult) {
      res.redirect('/dbBoard');
    } else {
      const err = new Error('글 쓰기 실패');
      throw err;
    }
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    throw err;
  }
});

router.get('/modify/:id', isLogin, async (req, res) => {
  const findArticle = await db.getArticle(req.params.id);
  if (findArticle) {
    res.render('dbBoard_modify', { selectedArticle: findArticle });
  }
});

router.post('/modify/:id', isLogin, async (req, res) => {
  if (req.body.title && req.body.content) {
    const modifyResult = await db.modifyArticle(req.params.id, req.body);
    if (modifyResult) {
      res.redirect('/dbBoard');
    } else {
      const err = new Error('글 수정 실패');
      throw err;
    }
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    throw err;
  }
});

router.delete('/delete/:id', isLogin, async (req, res) => {
  const deleteResult = await db.deleteArticle(req.params.id);
  if (deleteResult) {
    res.send('삭제 완료!');
  } else {
    const err = new Error('글 삭제 실패');
    throw err;
  }
});

module.exports = router;
