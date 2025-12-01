-- 003_seed_admin.sql
-- Replace the password_hash with a real bcrypt hash before running.
-- Example to generate (Node REPL):
-- const bcrypt = require('bcryptjs'); bcrypt.hashSync('YourPasswordHere', 10);
INSERT INTO public.admin_users (username, password_hash, role)
VALUES ('admin', '$2a$10$kdK25KrCpQOoAs8Kl9D4UeZUTAkkUGd6zxc2QjZS8JSuFCXdShre2', 'superadmin')
ON CONFLICT (username) DO NOTHING;
