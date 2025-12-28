-- V20251024143611__weddings_table.sql
-- Migration: weddings_table

CREATE TABLE IF NOT EXISTS weddings (
  id SERIAL PRIMARY KEY,

  themes JSONB NOT NULL,
  wedding_objects JSONB NOT NULL,
  address_wedding JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);