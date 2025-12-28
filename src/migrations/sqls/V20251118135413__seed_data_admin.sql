-- -- Migration: seed_data_admin

-- BEGIN;

-- INSERT INTO admins (
--   email,
--   password,
--   name,
--   role,
--   status,
--   last_login_date
-- )
-- SELECT
--   'dev@teso.com',
--   '$2b$10$5WtZQ3lZOevt1iXXYv1gWej9B1ik/GFII0Eii05C3bg.1S2vz6Qq2',
--   'Super Admin',
--   'SUPER_ADMIN',
--   'ACTIVE',
--   NOW()
-- WHERE NOT EXISTS (
--   SELECT 1 FROM admins WHERE email = 'dev@teso.com'
-- );

-- COMMIT;
