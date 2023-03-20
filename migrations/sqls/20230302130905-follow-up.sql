CREATE TABLE IF NOT EXISTS "Follow"(
  "id" SERIAL PRiMARY KEY,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "followId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL
);