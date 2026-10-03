const { pool } = require('../config/db');

exports.checkHealth = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW(), VERSION()');
    client.release();

    res.json({
      status: 'online',
      message: 'PostgreSQL database connected successfully',
      timestamp: result.rows[0].now,
      postgresVersion: result.rows[0].version,
      serverTime: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({
      status: 'offline',
      message: 'Database connection failed',
      error: err.message,
      hint: 'Ensure PostgreSQL is running locally or via `docker-compose up -d`',
      serverTime: new Date().toISOString()
    });
  }
};
