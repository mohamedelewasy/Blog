import supertest from 'supertest';

import app from '../app';
import db from '../config/db';
import { userRoutes } from '../types/routes';

const request = supertest(app);

describe('test user endpoints', () => {
  beforeAll(async () => {
    const sql = `DELETE FROM "User"; ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
    await db.query(sql);
  });
  describe('signup', () => {
    it('signup with valid user', async () => {
      const result = await request.post(userRoutes.signup.url).send({
        firstName: 'test',
        lastName: 'user',
        email: 'email1@email.com',
        password: 'password',
      });
      expect(result.body.token).toBeDefined();
    });

    it('signup with invalid email', async () => {
      const result = await request.post(userRoutes.signup.url).send({
        firstName: 'test',
        lastName: 'user',
        email: 'email1',
        password: 'password',
      });
      expect(result.body.error).toContain('invalid email format');
    });

    it('signup with invalid password', async () => {
      const result = await request.post(userRoutes.signup.url).send({
        firstName: 'test',
        lastName: 'user',
        email: 'email2@email.com',
        password: 'pass',
      });
      expect(result.body.error).toBe('password must be 6 or greater');
    });
  });

  describe('signin', () => {
    it('signin with valid user', async () => {
      const result = await request.post(userRoutes.signin.url).send({
        email: 'email1@email.com',
        password: 'password',
      });
      expect(result.body.token).toBeDefined();
    });

    it('signin with invalid email', async () => {
      const result = await request.post(userRoutes.signin.url).send({
        email: 'email0@email.com',
        password: 'password',
      });
      expect(result.body.error).toEqual('incorrect email or password');
    });

    it('signin with invalid password', async () => {
      const result = await request.post(userRoutes.signin.url).send({
        email: 'email1@email.com',
        password: 'passworddd',
      });
      expect(result.body.error).toEqual('incorrect email or password');
    });
  });

  describe('signout', () => {
    it('signout with logged user', async () => {
      const loggedUser = await request.post(userRoutes.signin.url).send({
        email: 'email1@email.com',
        password: 'password',
      });
      await request
        .post(userRoutes.signout.url)
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      const sql = `SELECT token FROM "User" WHERE email='email1@email.com';`;
      const result = await db.query(sql);
      expect(result[0][0]).toEqual({ token: '' });
    });
  });

  describe('show', () => {
    beforeAll(async () => {
      await request
        .post(userRoutes.signup.url)
        .send({ firstName: 'mohamed', email: 'mohamed@email.com', password: 'password' });
      await request
        .post(userRoutes.signup.url)
        .send({ firstName: 'ahmed', email: 'ahmed@email.com', password: 'password' });
    });
    it('filter by name=ahme', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'password' });
      const result = await request
        .get(userRoutes.show.url)
        .query({ name: 'ahme' })
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      expect(result.body.list).toContain(jasmine.objectContaining({ firstName: 'ahmed' }));
    });
    it('filter by email=mohamed@email.com', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'password' });
      const result = await request
        .get(userRoutes.show.url)
        .query({ email: 'mohamed@email.com' })
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      expect(result.body.list).toContain(jasmine.objectContaining({ firstName: 'mohamed' }));
    });
  });

  describe('reset password', () => {
    it('valid old and new passwords', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'password' });
      await request
        .put(userRoutes.resetPassword.url)
        .send({ oldPassword: 'password', newPassword: 'newPassword' })
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      const result = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      expect(result.statusCode).toBe(200);
    });

    it('invalid old password', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      const result = await request
        .put(userRoutes.resetPassword.url)
        .send({ oldPassword: 'passworddd', newPassword: 'password' })
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      expect(result.body.error).toBe('incorrect password');
    });
    it('invalid new password', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      const result = await request
        .put(userRoutes.resetPassword.url)
        .send({ oldPassword: 'newPassword', newPassword: 'pass' })
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      expect(result.body.error).toBe('password must be 6 or greater');
    });
  });

  // TODO: test update profile image
  // describe('update profile image', () => {
  //   it('update with valid image', async () => {
  //     fs.writeFileSync(path.join(__dirname, 'img.jpg'), '');
  //     const loggedUser = await request
  //       .post(userRoutes.signin.url)
  //       .send({ email: 'email1@email.com', password: 'password' });
  //     const result = await request
  //       .put(userRoutes.updateProfileImg.url)
  //       .set('Authorization', `Bearer ${loggedUser.body.token}`)
  //       .set('Content-Type', 'multipart/form-data')
  //       .send({ profileImage: fs.readFileSync(path.join(__dirname, 'img.jpg')) });
  //     console.log(result);
  //   });
  // });

  describe('block', () => {
    let token!: string;
    beforeAll(async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      token = loggedUser.body.token;
    });
    it('block valid user id=2', async () => {
      const result = await request
        .post(userRoutes.block.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
    it('block valid user for second time', async () => {
      const result = await request
        .post(userRoutes.block.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('already block this user');
    });
    it('block unexists user', async () => {
      const result = await request
        .post(userRoutes.block.url.replace(':userId', '22'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('user not found');
    });
    it('user block himself', async () => {
      const result = await request
        .post(userRoutes.block.url.replace(':userId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('cannot block your self');
    });

    it('user block following user with id=4', async () => {
      await request
        .post(userRoutes.signup.url)
        .send({ email: 'user4@email.com', password: 'password' });
      // follow user id=4
      await request
        .post(userRoutes.follow.url.replace(':userId', '4'))
        .set('Authorization', `Bearer ${token}`);
      // block user
      await request
        .post(userRoutes.block.url.replace(':userId', '4'))
        .set('Authorization', `Bearer ${token}`);
      // expect user removed from follow list
      const result = await request
        .get(userRoutes.followingList.url)
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.count).toBe(0);
    });
  });

  describe('block list', () => {
    it('get blocked list excpect 3 users', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      await request
        .post(userRoutes.block.url.replace(':userId', '3'))
        .set('Authorization', `Bearer ${loggedUser.body.token}`);

      const result = await request
        .get(userRoutes.blockList.url)
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      expect(result.body.count).toBe(3);
      expect(result.body.list).toContain({ blocking: jasmine.objectContaining({ id: 2 }) });
      expect(result.body.list).toContain({ blocking: jasmine.objectContaining({ id: 3 }) });
      expect(result.body.list).toContain({ blocking: jasmine.objectContaining({ id: 4 }) });
    });
  });

  describe('unblock', () => {
    let token!: string;
    beforeAll(async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      token = loggedUser.body.token;
    });
    it('unblock alredy blocked user', async () => {
      const result = await request
        .post(userRoutes.unblock.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
    it('unblock for non blocked user', async () => {
      const result = await request
        .post(userRoutes.unblock.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('already unblocked this user');
    });
    it('user unblock him self', async () => {
      const result = await request
        .post(userRoutes.unblock.url.replace(':userId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('cannot unblock your self');
    });
    it('user unblock inexists user', async () => {
      const result = await request
        .post(userRoutes.unblock.url.replace(':userId', '11'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('user not found');
    });
  });

  describe('view list', () => {
    it('user id = 2 view profile for user id = 1', async () => {
      // user 2 mohamed
      const userId2 = await request
        .post(userRoutes.signin.url)
        .send({ email: 'mohamed@email.com', password: 'password' });
      await request
        .get(userRoutes.get.url.replace(':userId', '1'))
        .set('Authorization', `Bearer ${userId2.body.token}`);
      const userId1 = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      const viewList = await request
        .get(userRoutes.viewersList.url)
        .set('Authorization', `Bearer ${userId1.body.token}`);
      expect(viewList.body.count).toBe(1);
      expect(viewList.body.list).toContain({ viewers: jasmine.objectContaining({ id: 2 }) });
    });
  });

  describe('change user role', () => {
    it('change role with un admin user', async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      const result = await request
        .put(userRoutes.updateUserRole.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${loggedUser.body.token}`);
      expect(result.body.error).toBe('access denied');
    });
    it('change role with admin user for user id = 2', async () => {
      await db.query('UPDATE "User" SET "isAdmin"=true WHERE id=1;');
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      const result = await request
        .put(userRoutes.updateUserRole.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${loggedUser.body.token}`)
        .send({ isAdmin: true });
      expect(result.statusCode).toBe(200);
    });
  });

  describe('follow', () => {
    let token!: string;
    beforeAll(async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      token = loggedUser.body.token;
    });
    it('follow valid user with id=2', async () => {
      const result = await request
        .post(userRoutes.follow.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
    it('follow unexists user', async () => {
      const result = await request
        .post(userRoutes.follow.url.replace(':userId', '22'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('user not found');
    });
    it('user follow himself', async () => {
      const result = await request
        .post(userRoutes.follow.url.replace(':userId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('cannot follow your self');
    });
    it('follow blocked user', async () => {
      await request
        .post(userRoutes.block.url.replace(':userId', '3'))
        .set('Authorization', `Bearer ${token}`);
      const result = await request
        .post(userRoutes.follow.url.replace(':userId', '3'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('cannot follow blocked user');
    });
  });

  describe('follow list', () => {
    let token!: string;
    beforeAll(async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      token = loggedUser.body.token;
    });
    it('following expect 1 user', async () => {
      const result = await request
        .get(userRoutes.followingList.url)
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.count).toBe(1);
      expect(result.body.list).toContain({ following: jasmine.objectContaining({ id: 2 }) });
    });
    it('followers expect 0 user', async () => {
      const result = await request
        .get(userRoutes.followersList.url)
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.count).toBe(0);
    });
  });

  describe('unfollow', () => {
    let token!: string;
    beforeAll(async () => {
      const loggedUser = await request
        .post(userRoutes.signin.url)
        .send({ email: 'email1@email.com', password: 'newPassword' });
      token = loggedUser.body.token;
    });
    it('unfollow valid user with id=2', async () => {
      const result = await request
        .post(userRoutes.unfollow.url.replace(':userId', '2'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.statusCode).toBe(200);
    });
    it('unfollow unexists user', async () => {
      const result = await request
        .post(userRoutes.unfollow.url.replace(':userId', '22'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('user not found');
    });
    it('user unfollow himself', async () => {
      const result = await request
        .post(userRoutes.unfollow.url.replace(':userId', '1'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('cannot unfollow your self');
    });
    it('unfollow blocked user', async () => {
      await request
        .post(userRoutes.block.url.replace(':userId', '3'))
        .set('Authorization', `Bearer ${token}`);
      const result = await request
        .post(userRoutes.unfollow.url.replace(':userId', '3'))
        .set('Authorization', `Bearer ${token}`);
      expect(result.body.error).toBe('already unfollow this user');
    });
  });
});
