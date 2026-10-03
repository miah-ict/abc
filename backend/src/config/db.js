const { Pool } = require('pg');
const env = require('./env');

let poolConfig;

if (env.databaseUrl) {
  poolConfig = {
    connectionString: env.databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  poolConfig = {
    user: env.db.user,
    password: env.db.password,
    host: env.db.host,
    port: env.db.port,
    database: env.db.name,
    ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
  };
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('[DB Pool Error]', err);
});

const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`[DB Query] ${text.slice(0, 60)}... - ${duration}ms (${res.rowCount} rows)`);
    return res;
  } catch (err) {
    console.error(`[DB Error] ${err.message}`);
    throw err;
  }
};

module.exports = {
  pool,
  query,
};

