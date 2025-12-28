-- V20251024143612__guests_table.sql
-- Migration: guests_table

CREATE TABLE IF NOT EXISTS guests (
  id SERIAL PRIMARY KEY,

  wedding_id INT NOT NULL,
  full_name VARCHAR(255) NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_guests_wedding
    FOREIGN KEY (wedding_id)
    REFERENCES weddings(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_guests_wedding_id ON guests(wedding_id);
