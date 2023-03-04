CREATE TABLE IF NOT EXISTS "User" (
  "id" SERIAL PRIMARY KEY,
  "firstName" VARCHAR(32),
  "lastName" VARCHAR(32),
  "profileImage" VARCHAR,
  "email" VARCHAR(64) UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "isBlocked" BOOLEAN NOT NULL DEFAULT 'false',
  "isAdmin" BOOLEAN NOT NULL DEFAULT 'false',
  "plan" VARCHAR(8) NOT NULL DEFAULT 'free',
  "token" VARCHAR,
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL
);