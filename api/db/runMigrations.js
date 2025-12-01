/**
 * runMigrations.js
 * Sequentially applies SQL migration files in db/migrations.
 */
require('dotenv').config(); // Load environment variables first

const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function run() {
  const dir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log('Running migrations:', files);
  for (const file of files) {
    const full = path.join(dir, file);
    const sql = fs.readFileSync(full, 'utf8');
    console.log(`\nApplying: ${file}`);
    try {
      await pool.query('BEGIN');
      await pool.query(sql);
      await pool.query('COMMIT');
      console.log(`✔ Applied: ${file}`);
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error(`✖ Failed: ${file} -> ${err.message}`);
      process.exit(1);
    }
  }
  console.log('\nAll migrations applied successfully');
  await pool.end();
}

run();
