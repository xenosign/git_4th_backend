const express = require('express');
const db = require('../controllers/boardController');

const router = express.Router();

function isLogin(req, res, next) {
  console.log(req.session.login, req.signedCookies.user);
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.send('로그인 해주세요.<br><a href="/login">로그인 페이지로 이동</a>');
  }
}

router.get('/', isLogin, (req, res) => {
  db.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('dbBoard', {
      ARTICLE,
      articleCounts,
      userId: req.session.userId,
    });
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

router.post('/write', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };
    db.writeArticle(newArticle, (data) => {
      if (data.protocol41) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 쓰기 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    throw err;
  }
});

router.get('/modify/:id', isLogin, (req, res) => {
  db.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('dbBoard_modify', { selectedArticle: data[0] });
    }
  });
});

router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    db.modifyArticle(req.params.id, req.body, (data) => {
      console.log(data);
      if (data.protocol41) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 수정 실패');
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    throw err;
  }
});

router.delete('/delete/:id', isLogin, (req, res) => {
  db.deleteArticle(req.params.id, (data) => {
    console.log(data);
    if (data.protocol41) {
      res.send('삭제 완료!');
    } else {
      const err = new Error('글 삭제 실패');
      throw err;
    }
  });
});

module.exports = router;
