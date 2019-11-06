const { pool } = require('../config/db');

const ArticleService = {
  index(req, res, done) {
    ArticleService.getAllArticles()
      .then(response => {
        res.status(200).send({ status: 'success', data: response });
      })
      .catch(err => {
        const message = err;
        res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
  show(req, res, done) {
    ArticleService.getArticleById(req.params.id)
      .then(response => {
        const articleId = response.id;
        return res.status(200).send({
          status: 'success',
          data: { articleId, ...response }
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
  store(req, res, done) {
    ArticleService.createArticle(req.body)
      .then(response => {
        const message = 'Article successfully posted';
        const articleId = response.id;
        return res.status(201).send({
          status: 'success',
          data: { articleId, message, ...response }
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
  update(req, res, done) {
    ArticleService.updateArticle(req.params.id, req.body)
      .then(response => {
        const message = 'Article successfully updated';
        const articleId = response.id;
        return res.status(202).send({
          status: 'success',
          data: { articleId, message, ...response }
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
  destroy(req, res, done) {
    ArticleService.deleteArticle(req.params.id)
      .then(() => {
        const message = 'Article successfully deleted';
        return res.status(202).send({
          status: 'success',
          data: { message }
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
            reject(err);
          })
          .finally(() => {
            done();
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
  async deleteArticle(id) {
    return new Promise((resolve, reject) => {
      resolve('amen');
      const text = `DELETE FROM articles WHERE id=$1`;
      pool.connect(function(err, client, done) {
        if (err) {
          reject();
        }
        client
          .query(text, [id])
          .then(response => {
            resolve();
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => {
            done();
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
  },
  async getArticleById(id) {
    const values = [id];
    return new Promise((resolve, reject) => {
      const queryString = `SELECT * FROM articles WHERE id=$1`;
      pool.connect((err, client, done) => {
        if (err) {
          reject();
        }
        client
          .query(queryString, values)
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
  }
};

module.exports = ArticleService;
