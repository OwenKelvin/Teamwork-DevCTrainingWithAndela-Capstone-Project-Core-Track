const  pg  = require( 'pg' );

// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'teamwork',
//   password: 'password',
//   port: 5432
// });
// client.connect();
// module.exports = client;



// const db = {
//   user: 'root',
//   host: 'localhost',
//   database: 'teamwork',
//   password: 'password',
//   port: 5432
// };
// module.exports = db;

const config = {
  user: 'root',
  host: 'localhost',
  database: 'teamwork',
  password: 'password',
  port: 5432
};
const pool = new pg.Pool( config );


module.exports = { config, pool };