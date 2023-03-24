# API Requirements

API build based on 2 main routes (user, post)

- the first route
  user can follow, unfollow, block others
  user can view who visit his profile
- the second route
  user can publish a post and interact with others' posts by like, dislike, comment

## API Endpoints

### User

you can find types of endpoints response, request and params in [user-endpoint-types](./src/types/userEndpoints.ts)

- signin route: `/api/v1/auth/signin` [POST]
- signup route: `/api/v1/auth/signup` [POST]
- signout route: `/api/v1/auth/signout` [POST]
- users-list route: `/api/v1/auth/users` [GET] [token-required]
- user-by-id route: `/api/v1/auth/:userId` [GET] [token-required]
- reset-password route: `/api/v1/auth/profile/reset-password` [PUT] [token-required]
- set-profile-img route: `/api/v1/auth/profile/profile-image` [PUT] [token-required]
- get-profile-img route: `/api/v1/auth/profile/profile-image` [GET] [token-required]
- profile-viewers route: `/api/v1/auth/profile/view-list` [GET] [token-required]
- follow-user route: `/api/v1/auth/:userId/follow` [POST] [token-required]
- unfollow-user route: `/api/v1/auth/:userId/unfollow` [POST] [token-required]
- followers-list route: `/api/v1/auth/profile/follower-list` [GET] [token-required]
- following-list route: `/api/v1/auth/profile/follow-list` [GET] [token-required]
- block-user route: `/api/v1/auth/:userId/block` [POST] [token-required]
- unblock-user route: `/api/v1/auth/:userId/unblock` [POST] [token-required]
- block-list route: `/api/v1/auth/profile/block-list` [GET] [token-required]
- change-user-role route: `/api/v1/auth/:userId/role` [PUT] [admin-required]

### Post

you can find types of endpoints response, request and params in [post-endpoint-types](./src/types/postEndpoints.ts)

- create-post route: `/api/v1/post` [POST]
- posts-list route: `/api/v1/post` [GET]
- get-post-by-id route: `/api/v1/post/:postId` [GET]
- update-post-by-id route: `/api/v1/post/:postId` [PATCH]
- delete-post-by-id route: `/api/v1/post/:postId` [DELETE]
- set-post-Image route: `/api/v1/post/:postId/image` [PUT]
- get-post-Image route: `/api/v1/post/:postId/image` [GET]
- like-post route: `/api/v1/post/:postId/like` [POST]
- dislike-post route: `/api/v1/post/:postId/dislike` [POST]
- post-likers-list route: `/api/v1/post/:postId/likers` [GET]
- create-comment route: `/api/v1/post/:postId/comment` [POST]
- get-post-comments route: `/api/v1/post/:postId/comment` [GET]
- get-comment-by-id route: `/api/v1/post/:postId/comment/:commentId` [GET]
- update-comment-by-id route: `/api/v1/post/:postId/comment/:commentId` [PUT]
- delete-comment-by-id route: `/api/v1/post/:postId/comment/:commentId` [DELTE]

## Data Shapes

**User**

```sql
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
```

**Post**

```sql
CREATE TABLE IF NOT EXISTS "Post" (
  "id" SERIAL PRIMARY KEY,
  "desc" VARCHAR NOT NULL,
  "image" VARCHAR,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL
);
```

**Comment**

```sql
CREATE TABLE IF NOT EXISTS "Comment" (
  "id" SERIAL PRIMARY KEY,
  "comment" VARCHAR NOT NULL,
  "postId" INTEGER REFERENCES "Post"(id) ON DELETE CASCADE NOT NULL,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL
);
```

**Like**

```sql
CREATE TABLE IF NOT EXISTS "Like" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "postId" INTEGER REFERENCES "Post"(id) ON DELETE CASCADE NOT NULL
);
```

**Follow**

```sql
CREATE TABLE IF NOT EXISTS "Follow"(
  "id" SERIAL PRiMARY KEY,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "followId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL
);
```

**Block**

```sql
CREATE TABLE IF NOT EXISTS "Block" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "blockedId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL
);
```

**View**

```sql
CREATE TABLE IF NOT EXISTS "View"(
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL,
  "viewId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE NOT NULL
);
```
