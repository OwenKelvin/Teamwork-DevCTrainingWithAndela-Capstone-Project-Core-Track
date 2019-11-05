const { pool } = require('../config/db');

const ArticleService = {
  index(req, res, done) {
    ArticleService.getAllArticles()
      .then(response => {
        res.status(200).send({ status: 'success', data: response });
        done();
      })
      .catch(err => {
        const message = err;
        res.status(500).send({ status: false, data: { message } });
        done();
      });
  },
  store(req, res, done) {
    ArticleService.createArticle(req.body)
      .then(response => {
        const message = 'Article successfully posted';
        const articleId = response.id;
        res.status(201).send({
          status: 'success',
          data: { articleId, message, ...response }
        });
        done();
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
        done();
      });
  },
  update(req, res, done) {
    ArticleService.updateArticle(req.params.id, req.body)
      .then(response => {
        const message = 'Article successfully updated';
        const articleId = response.id;
        res.status(202).send({
          status: 'success',
          data: { articleId, message, ...response }
        });
        done();
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
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
            done();
          })
          .finally(() => {
            // pool.end();
          });
      });
    });
  },
  async updateArticle(id, data) {
    const { title, article } = data;
    const values = [title, article, id];
    return new Promise((resolve, reject) => {
      const text = `UPDATE articles SET title=$1, article=$2 WHERE id=$3 RETURNING *`;
      pool.connect(function(err, client, done) {
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
            done();
          })
          .finally(() => {
            // pool.end();
          });
      });
    });
  },
  async getAllArticles() {
    return new Promise((resolve, reject) => {
      const text = `SELECT * FROM articles ORDER by id DESC`;
      pool.connect(function(err, client, done) {
        if (err) {
          return console.error('connection error', err);
        }
        client
          .query(text)
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
