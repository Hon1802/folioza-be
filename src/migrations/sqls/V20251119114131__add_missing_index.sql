-- -- Migration: add_missing_index

-- -- Add extension for trigram
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- -- Table files
-- CREATE UNIQUE INDEX IF NOT EXISTS uidx_files_key ON files(key);

-- -- Table admins
-- CREATE INDEX IF NOT EXISTS idx_admins_name_trgm ON admins USING GIN (name gin_trgm_ops);
-- CREATE INDEX IF NOT EXISTS idx_admins_status ON admins(status);
-- CREATE INDEX IF NOT EXISTS idx_admins_role ON admins(role);

-- -- Table users
-- CREATE INDEX IF NOT EXISTS idx_users_name_trgm ON users USING GIN (name gin_trgm_ops);
-- CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
-- CREATE INDEX IF NOT EXISTS idx_users_province_id_ward_id ON users(province_id, ward_id);
-- CREATE INDEX IF NOT EXISTS idx_users_address_trgm ON users USING GIN (address gin_trgm_ops);

-- -- Table user children
-- CREATE INDEX IF NOT EXISTS idx_user_children_user_id ON user_children(user_id);
-- CREATE INDEX IF NOT EXISTS idx_user_children_name_trgm ON user_children USING GIN (name gin_trgm_ops);

-- -- Table gift categories
-- CREATE INDEX IF NOT EXISTS idx_gift_categories_name_trgm ON gift_categories USING GIN (name gin_trgm_ops);
-- CREATE INDEX IF NOT EXISTS idx_gift_categories_status ON gift_categories(status);

-- -- Table gifts
-- CREATE INDEX IF NOT EXISTS idx_gifts_name_trgm ON gifts USING GIN (name gin_trgm_ops);
-- CREATE INDEX IF NOT EXISTS idx_gifts_status ON gifts(status);
-- CREATE INDEX IF NOT EXISTS idx_gifts_type ON gifts(type);

-- -- Table journeys
-- CREATE INDEX IF NOT EXISTS idx_journeys_name_trgm ON journeys USING GIN (name gin_trgm_ops);
-- CREATE INDEX IF NOT EXISTS idx_journeys_status ON journeys(status);
-- CREATE INDEX IF NOT EXISTS idx_journeys_start_date ON journeys(start_date);
-- CREATE INDEX IF NOT EXISTS idx_journeys_end_date ON journeys(end_date);

-- -- Table orders
-- CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
-- CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
-- CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);
-- CREATE INDEX IF NOT EXISTS idx_orders_delivery_method ON orders(delivery_method);

-- -- Table order details
-- CREATE INDEX IF NOT EXISTS idx_order_details_order_id ON order_details(order_id);
-- CREATE INDEX IF NOT EXISTS idx_order_details_user_id ON order_details(user_id);

-- -- Table outbox_messages
-- CREATE INDEX IF NOT EXISTS idx_outbox_messages_provider ON outbox_messages(provider);
-- CREATE INDEX IF NOT EXISTS idx_outbox_messages_status ON outbox_messages(status);
-- CREATE INDEX IF NOT EXISTS idx_outbox_messages_type ON outbox_messages(type);

-- -- Table system_configs
-- CREATE UNIQUE INDEX IF NOT EXISTS uidx_system_configs_type ON system_configs(type);
