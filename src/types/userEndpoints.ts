import { User } from './schema';

type IncludedUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'profileImage'>;

export type signinParam = never;
export type signinRes = { token: string };
export type signinReq = { email: string; password: string };

export type blockParam = { userId: string };
export type blockRes = never;
export type blockReq = never;

export type blockListParam = never;
export type blockListRes = {
  count: number;
  list: { blocking: IncludedUser }[];
};
export type blockListReq = never;

export type followParam = { userId: string };
export type followRes = never;
export type followReq = never;

export type followingListParam = never;
export type followingListRes = {
  count: number;
  list: { following: IncludedUser[] };
};
export type followingListReq = never;

export type followersListParam = never;
export type followersListRes = {
  count: number;
  list: { follower: IncludedUser[] };
};
export type followersListReq = never;

export type getParam = { userId: string };
export type getRes = { user: IncludedUser };
export type getReq = never;

export type showParam = never;
export type showRes = { list: IncludedUser[] };
export type showReq = never;

export type resetPasswordParam = never;
export type resetPasswordRes = { token: string };
export type resetPasswordReq = { oldPassword: string; newPassword: string };

export type signupParam = never;
export type signupRes = { token: string };
export type signupReq = { firstName: string; lastName: string; email: string; password: string };

export type updateProfileImgParam = never;
export type updateProfileImgRes = never;
export type updateProfileImgReq = { profileImage: string };

export type updateUserRoleParam = { userId: string };
export type updateUserRoleRes = never;
export type updateUserRoleReq = { isAdmin: boolean };

export type viewersListParam = never;
export type viewersListRes = { count: number; list: { viewers: IncludedUser }[] };
export type viewersListReq = never;
