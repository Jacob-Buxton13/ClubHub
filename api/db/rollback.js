/**
 * rollback.js
 * Dev-only helper to drop all application tables.
 * Use with caution. Not for production environments.
 */
require('dotenv').config(); // Load environment variables first

const pool = require('../src/config/db');

(async () => {
  try {
    console.log('Rolling back schema (dropping tables)...');
    await pool.query('DROP TABLE IF EXISTS public.officers CASCADE');
    await pool.query('DROP TABLE IF EXISTS public.events CASCADE');
    await pool.query('DROP TABLE IF EXISTS public.club_categories CASCADE');
    await pool.query('DROP TABLE IF EXISTS public.categories CASCADE');
    await pool.query('DROP TABLE IF EXISTS public.clubs CASCADE');
    await pool.query('DROP TABLE IF EXISTS public.admin_users CASCADE');
    console.log('Rollback complete');
  } catch (e) {
    console.error('Rollback error:', e.message);
  } finally {
    pool.end();
  }
})();
