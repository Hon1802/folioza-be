-- -- Migration: seed_data_system_config

-- BEGIN;

-- INSERT INTO system_configs ("type", is_active, "data")
-- SELECT 'VGS_CONFIG', true, '{"isActiveZNS": true}'
-- WHERE NOT EXISTS (
--   SELECT 1 FROM system_configs WHERE "type" = 'VGS_CONFIG'
-- );

-- COMMIT;
