CREATE TABLE IF NOT EXISTS "Comment" (
  "id" SERIAL PRIMARY KEY,
  "comment" VARCHAR NOT NULL,
  "postId" INTEGER REFERENCES "Post"(id) NOT NULL,
  "userId" INTEGER REFERENCES "User"(id) NOT NULL,  
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL
);