const Post = require('../model/article');

/**
 * state: 0草稿 1发布
 * 默认查找state为1的文章
 */
const list = (req, res, next) => {
  let { state = 1 } = req.query;
  let { keyword } = req.params;
  keyword = decodeURIComponent(keyword);
  let findOption = {};
  let reg = new RegExp(keyword, 'i');
  if (keyword) {
    // 通过keyword查询
    findOption = {
      state: {
        $ne: 0
      },
      $or: [
        {
          title: {
            $regex: reg
          }
        },
        {
          content: {
            $regex: reg
          }
        }
      ]
    };
  } else {
    // 所有文章
    findOption = {
      state
    };
  }
  Post.list(findOption)
    .then(data => {
      res.json({
        code: 200,
        data: data.data,
        total: data.total
      });
    })
    .catch(e => next(e));
};

/**
 * 获取列表(已发布，草稿)默认已发布
 */
const getList = (req, res, next) => {
  const { limit, state = 1 } = req.query;
  Post.list(
    {
      state
    },
    null,
    { limit }
  )
    .then(data => {
      res.json({
        code: 200,
        ...data
      });
    })
    .catch(e => next(e));
};

/**
 * 按时间归档
 */
const getArticlesByTime = (req, res) => {
  const filterOption = {
    title: 1,
    summary: 1,
    posterImg: 1
  };
  Post.find({}, filterOption)
    .sort({
      createdAt: -1
    })
    .then(list => {
      res.json({
        code: 200,
        data: list
      });
    });
};

/**
 * 文章详情
 */
const getArticle = (req, res,) => {
  return res.json({
    code: 200,
    data: req.article
  });
};

const load = (req, res, next) => {
  const { id } = req.params;
  return Post.get(id)
    .then(article => {
      req.article = article;
      return next();
    })
    .catch(e => next(e));
};

/**
 * 创建文章
 */
const create = (req, res, next) => {
  let body = req.body;
  const article = new Post(body);
  console.log(article);
  article
    .save()
    .then(resArticle => res.json({ code: 200, data: resArticle }))
    .catch(e => next(e));
};

/**
 * 修改文章
 */
const update = (req, res, next) => {
  const article = req.article; // 文章实例
  article.title = req.body.title;
  article.content = req.body.content;
  article.summary = req.body.summary;
  article.posterImg = req.body.posterImg;
  article.state = req.body.state;
  article.tags = req.body.tags;

  article
    .save(article)
    .then(savedArticle => res.json({ code: 200, data: savedArticle }))
    .catch(e => next(e));
};

const remove = (req, res, next) => {
  const article = req.article;
  article
    .remove()
    .then(savedArticle => res.json({ code: 200, data: savedArticle }))
    .catch(e => next(e));
};

module.exports = {
  list,
  getList,
  getArticle,
  getArticlesByTime,
  create,
  update,
  remove,
  load
};
