-- Add SQL in this file to create the database tables for your API

CREATE TABLE IF NOT EXISTS polls (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  closes_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
