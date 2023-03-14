-- Add SQL in this file to create the database tables for your API

CREATE TABLE IF NOT EXISTS polls (
  id INTEGER PRIMARY KEY,
  question TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
