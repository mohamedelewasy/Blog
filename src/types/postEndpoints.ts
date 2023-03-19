import { Post, User } from './schema';

type IncludedUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'profileImage'>;
export type createParam = never;
export type createRes = { post: Post };
export type createReq = { desc: string; image: string | undefined };

export type removeParam = { postId: number };
export type removeRes = never;
export type removeReq = never;

export type likeParam = { postId: number };
export type likeRes = never;
export type likeReq = never;

export type getParam = { postId: number };
export type getRes = { post: Post };
export type getReq = never;

export type likersListParam = { postId: number };
export type likersListRes = { count: number; list: IncludedUser[] };
export type likersListReq = never;

export type showParam = never;
export type showRes = { post: (Post & { user: IncludedUser })[] };
export type showReq = never;

export type updateParam = { postId: number };
export type updateRes = never;
export type updateReq = { desc: string | undefined; image: string | undefined };
