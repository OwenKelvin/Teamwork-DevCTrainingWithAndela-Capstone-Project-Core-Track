const { pool } = require('../config/db');

const ArticleService = {
  store(req, res, done) {
    ArticleService.createArticle(req.body)
      .then(response => {
        const message = 'Article successfully posted';
        const articleId = response.rows[0].id;
        res.status(201).send({
          status: 'success',
          data: { articleId, message, ...response }
        });
        done();
      })
      .catch(err => {
        const message = err;
        res.status(500).send({ status: false, data: { message } });
        done();
      });
  },
  async createArticle(data) {
    const { title, article } = data;
    const values = [title, article];
    return new Promise((resolve, reject) => {
      const text = `INSERT INTO articles( "title", "article") VALUES($1, $2) RETURNING *`;
      pool.connect(function(err, client, done) {
        if (err) {
          return console.error('connection error', err);
        }
        client
          .query(text, values)
          .then(response => {
            if (response.rows.length > 0) {
              resolve(response.rows);
            } else {
              reject();
            }
          })
          .catch(err => {
            done();
          })
          .finally(() => {
            // pool.end();
          });
      });
    });
  }
};

module.exports = ArticleService;
