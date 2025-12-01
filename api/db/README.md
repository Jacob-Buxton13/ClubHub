# Database Migrations

## Running Migrations
```bash
npm run migrate
```
Applies all `.sql` files in `db/migrations` in alphanumeric order.

## Adding a Migration
1. Create a new file: `NNN_description.sql` (e.g. `004_add_materialized_view.sql`).
2. Make it idempotent where possible (`IF NOT EXISTS`, `ON CONFLICT DO NOTHING`).
3. Commit the file.

## Rolling Back (Dev Only)
```bash
npm run rollback
```
Drops all application tables. Do NOT use in shared or production environments.

## Seed Files
- `002_seed_categories.sql` inserts default categories.
- `003_seed_admin.sql` creates initial admin (replace bcrypt hash first!).

## Bcrypt Password Hash
Generate with Node:
```bash
node -e "console.log(require('bcryptjs').hashSync('YourPasswordHere', 10))"
```
Replace placeholder in `003_seed_admin.sql` before running migrations.

## SSL on Azure
Set `PGSSLMODE=require` in `.env` so `db.js` enables SSL (with relaxed cert) for Azure-hosted PostgreSQL.
