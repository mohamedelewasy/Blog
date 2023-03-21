import supertest from 'supertest';

import app from '../app';
import db from '../config/db';
import { postRoutes, userRoutes } from '../types/routes';

const request = supertest(app);

describe('test post endpoints', () => {
  let token!: string;
  beforeAll(async () => {
    const sql = `DELETE FROM "User"; ALTER SEQUENCE "User_id_seq" RESTART WITH 1;
    DELETE FROM "Post"; ALTER SEQUENCE "Post_id_seq" RESTART WITH 1;
    DELETE FROM "Comment"; ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1;`;
    await db.query(sql);
    const loggedUser = await request
      .post(userRoutes.signup.url)
      .send({ email: 'email@email.com', password: 'password' });
    token = loggedUser.body.token;
  });
  describe('create post', () => {
    it('create a valid post', async () => {
      const result = await request
        .post(postRoutes.create.url)
        .set('Authorization', `Bearer ${token}`)
        .send({ desc: 'description' });
      expect(result.statusCode).toBe(200);
    });
    it('create post without desc', async () => {
      const result = await request
        .post(postRoutes.create.url)
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toContain('invalid description');
    });
  });

  describe('show', () => {
    it('expect 1 post', async () => {
      const result = await request.get(postRoutes.show.url).set('Authorization', `Bearer ${token}`);
      expect(result.body.list).toContain(
        jasmine.objectContaining({
          id: 1,
          userId: 1,
          desc: 'description',
          User: jasmine.objectContaining({ id: 1 }),
        })
      );
    });
  });

  describe('get', () => {
    it('post with id=1', async () => {
      const result = await request
        .get(postRoutes.get.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.post).toEqual(
        jasmine.objectContaining({
          id: 1,
          userId: 1,
          desc: 'description',
          User: jasmine.objectContaining({ id: 1 }),
        })
      );
    });
  });

  describe('update', () => {
    it('description', async () => {
      const result = await request
        .patch(postRoutes.update.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`)
        .send({ desc: 'new desc' });
      expect(result.statusCode).toBe(200);
    });
  });

  describe('like', () => {
    it('user with id=1 like post id=1', async () => {
      const result = await request
        .post(postRoutes.like.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
    it('user with id=1 like post id=1 twice', async () => {
      const result = await request
        .post(postRoutes.like.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('already liked this post');
    });
  });

  describe('post likers list', () => {
    it('post id=1 expect 1 user', async () => {
      const result = await request
        .get(postRoutes.likersList.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.count).toEqual(1);
      expect(result.body.list).toContain({ User: jasmine.objectContaining({ id: 1 }) });
    });
  });

  describe('dislike', () => {
    it('user with id=1 dislike post id=1', async () => {
      const result = await request
        .post(postRoutes.dislike.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
    it('user with id=1 dislike post id=1 twice', async () => {
      const result = await request
        .post(postRoutes.dislike.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('already disliked this post');
    });
  });

  describe('comment', () => {
    it('create', async () => {
      const result = await request
        .post(postRoutes.createComment.url.replace(':postId', '1'))
        .send({ comment: 'this is a comment' })
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });

    it('get', async () => {
      const result = await request
        .get(postRoutes.getComment.url.replace(':postId', '1').replace(':commentId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.comment).toEqual(
        jasmine.objectContaining({
          comment: 'this is a comment',
          User: jasmine.objectContaining({ id: 1 }),
        })
      );
    });

    it('show', async () => {
      const result = await request
        .get(postRoutes.showComment.url.replace(':postId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.count).toBe(1);
      expect(result.body.list).toContain(
        jasmine.objectContaining({
          comment: 'this is a comment',
          User: jasmine.objectContaining({ id: 1 }),
        })
      );
    });

    it('update', async () => {
      const result = await request
        .put(postRoutes.updateComment.url.replace(':postId', '1').replace(':commentId', '1'))
        .set('Authorization', `Bearer ${token}`)
        .send({ comment: 'new comment' });
      expect(result.statusCode).toBe(200);
    });
    it('delete', async () => {
      const result = await request
        .delete(postRoutes.removeComment.url.replace(':postId', '1').replace(':commentId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
  });

  it('delete post', async () => {
    const result = await request
      .delete(postRoutes.remove.url.replace(':postId', '1'))
      .set('Authorization', `Bearer ${token}`);
    expect(result.statusCode).toBe(200);
  });
});
