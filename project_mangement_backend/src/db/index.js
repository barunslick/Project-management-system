const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_database,
    charset: 'utf8',
  },
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
