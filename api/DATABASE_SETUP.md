## Database Setup & Migration Guide

### Prerequisites
- PostgreSQL installed locally or accessible Azure PostgreSQL instance
- `DATABASE_URL` set in `.env` file
- `PGSSLMODE=require` for Azure-hosted databases

### Running Migrations

Execute all migrations in sequence:
```bash
npm run migrate
```

This will create:
1. **Tables**: clubs, categories, club_categories, events, officers, admin_users
2. **Initial categories**: Academic, Service, Recreation, Professional, Spiritual + College categories
3. **Seed clubs**: ~55 clubs from CSV data with slugs, meeting info, website links
4. **Category mappings**: Links clubs to their respective college categories
5. **Sample events**: 4 initial events

### Rollback (Development Only)
```bash
npm run rollback
```
⚠️ **Warning**: Drops all application tables. Use only in local development.

### Admin User Setup

Before using admin endpoints, update the password hash in `db/migrations/003_seed_admin.sql`:

1. Generate bcrypt hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword', 10))"
```

2. Replace placeholder in `003_seed_admin.sql`
3. Run migrations

### Database Schema Overview

**clubs** - Main club information (id, slug, name, description, meeting details, contact, website)  
**categories** - Club categories (general + college-based)  
**club_categories** - Many-to-many junction table  
**events** - Club events (title, description, start/end times, location, cancelled flag)  
**officers** - Club leadership (name, role, contact) - optional for now  
**admin_users** - Authentication (username, password_hash, role, active status)

### Query Examples

Clubs are returned with:
- All associated categories (JSON array)
- Next upcoming event (JSON object)
- All meeting and contact metadata

Example club response:
```json
{
  "id": 23,
  "slug": "society-of-women-engineers",
  "name": "Society of Women Engineers",
  "categories": ["College of Physical Sciences & Engineering"],
  "next_event": {
    "id": 3,
    "title": "Friends-Giving",
    "start_at": "2025-11-26T22:00:00.000Z",
    "location": "STC 341"
  },
  "meeting_day": "Wednesday",
  "meeting_time": "5:30-6:30",
  "meeting_location": "STC 341"
}
```
