const { pool } = require('../config/db');

const articleCommentService = {
  store(req, res, done) {
    articleCommentService
      .createArticleComment(req.params.articleId, req.body)
      .then(response => {
        const message = 'Comment successfully created';
        return res.status(201).send({
          status: 'success',
          data: { message, data: response }
        });
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
  async createArticleComment(articleId, data) {
    const { comment } = data;
    const values = [comment, articleId];
    return new Promise((resolve, reject) => {
      const text = `INSERT INTO article_comments ("comment", "articleId") VALUES($1, $2) RETURNING *`;
      pool.connect((err, client, done) => {
        if (err) {
          reject();
        }
        client
          .query(text, values)
          .then(response => {
            if (response.rows.length > 0) {
              resolve(response.rows[0]);
            } else {
              reject();
            }
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => {
            done();
          });
      });
    });
  }
};

module.exports = articleCommentService;
