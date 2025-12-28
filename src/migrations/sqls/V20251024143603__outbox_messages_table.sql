-- Migration: outbox_messages_table

CREATE TABLE IF NOT EXISTS outbox_messages (
  id SERIAL PRIMARY KEY,
  provider VARCHAR(255) NOT NULL,
  call_type VARCHAR(255) NOT NULL,
  sync_type VARCHAR(255) NOT NULL,
  request TEXT NOT NULL,
  response TEXT NULL,
  retry_number INTEGER DEFAULT 0 NOT NULL,
  status VARCHAR(255) NOT NULL,
  "type" VARCHAR(255) NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);