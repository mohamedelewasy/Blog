CREATE TABLE IF NOT EXISTS "Post" (
  "id" SERIAL PRIMARY KEY,
  "desc" VARCHAR NOT NULL,
  "image" VARCHAR,
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL
);