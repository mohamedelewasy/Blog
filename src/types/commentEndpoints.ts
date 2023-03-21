import { Comment, User } from './schema';

type IncludedUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'profileImage'>;
export type createParam = { postId: string };
export type createRes = never;
export type createReq = { comment: string };

export type showParam = { postId: string };
export type showRes = { count: number; list: (Comment & { User: IncludedUser })[] };
export type showReq = never;

export type getParam = { commentId: string; postId: string };
export type getRes = { comment: Comment };
export type getReq = never;

export type removeParam = { commentId: string; postId: string };
export type removeRes = never;
export type removeReq = never;

export type updateParam = { commentId: string; postId: string };
export type updateRes = never;
export type updateReq = { comment: string };
