# Blog

Blog is a simple API as social media apps, it allows users to register and log into a web client, user can post and interact with others' posts by like or dislike or write a comment, user can follow, unfollow, or block other users, user can know who visit his profile.

The database schema and API routes can be found in [requirements](./requirements.md)

## Libraries used

- Runtime: nodejs
- Framework: Express.js
- Language: TypeScript
- Database: Postgresql
- Testing: jasmine and superjest

## Installation Instructions

- Clone this repository
- `cd Blog` then `npm install` to install dependencies
- `npm run create-dev-db` to create a new database `blog`
- `npm run create-test-db` to create a new database `blog_test` for testing
- `npm run migrate` to initialize database tables
- `npm start` will start the application
- you can check application health on `http://localhost:4000/healthz`

## Ports

- The applications runs on port 4000
- The database runs on port 5432

## Setup for .env file

```
ENV=development
PORT=4000
#postgres
PG_HOST=localhost
PG_DB=blog
PG_PORT=5432
PG_DB_TEST=blog_test
PG_USER=postgres
PG_PASSWORD=password
#bcrypt
SALT_ROUND=10
PAPER=paper
#jwt
JWT_SECRET=secret
```
