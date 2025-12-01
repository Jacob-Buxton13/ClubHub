const { Pool } = require('pg');

// Parse connection string to handle special characters in password
const connectionString = process.env.DATABASE_URL;

// If using Azure, parse manually to ensure password is handled correctly
let poolConfig;

if (connectionString) {
  try {
    const url = new URL(connectionString);
    poolConfig = {
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      database: url.pathname.slice(1), // Remove leading slash
      user: url.username,
      password: decodeURIComponent(url.password), // Decode any URL-encoded characters
      ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
    };
  } catch (err) {
    console.error('Error parsing DATABASE_URL:', err.message);
    throw new Error('Invalid DATABASE_URL format');
  }
} else {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected PG client error', err);
});

module.exports = pool;
