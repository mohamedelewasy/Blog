CREATE TABLE IF NOT EXISTS "Post" (
  "id" SERIAL PRIMARY KEY,
  "desc" VARCHAR NOT NULL,
  "image" VARCHAR,
  "userId" INTEGER REFERENCES "User"(id) NOT NULL,
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL
);